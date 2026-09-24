// What Clippy "knows" about the visitor. Everything but the city is read in
// the browser; the city comes from Vercel's geo headers via /api/whereami.
// None of it is stored or sent anywhere.

const VISITS_KEY = 'clippyVisits';
const COUNTED_KEY = 'clippyVisitCounted';
const CITY_TIMEOUT = 2000;

const OS_NAMES = {
  Mac: 'a Mac',
  iOS: 'iOS',
  Android: 'Android',
  Windows: 'Windows',
  Linux: 'Linux',
  ChromeOS: 'a Chromebook',
};

const REFERRERS = [
  [/(^|\.)linkedin\.com$/, 'LinkedIn'],
  [/^news\.ycombinator\.com$/, 'Hacker News'],
  [/(^|\.)google\./, 'Google'],
  [/(^|\.)github\.com$/, 'GitHub'],
  [/(^|\.)reddit\.com$/, 'Reddit'],
  [/(^|\.)(x|twitter)\.com$|^t\.co$/, 'X'],
];

// Count once per browser session, so refreshes don't inflate it.
export function countVisit() {
  try {
    if (sessionStorage.getItem(COUNTED_KEY)) return;
    sessionStorage.setItem(COUNTED_KEY, '1');
    let visits = Number(localStorage.getItem(VISITS_KEY)) || 0;
    localStorage.setItem(VISITS_KEY, String(visits + 1));
  } catch {
    // storage blocked (private mode etc.); he just won't count visits
  }
}

function getVisits() {
  try {
    return Number(localStorage.getItem(VISITS_KEY)) || 0;
  } catch {
    return 0;
  }
}

function getBrowser(ua) {
  if (/Edg(A|iOS)?\//.test(ua)) return 'Edge';
  if (/OPR\/|Opera/.test(ua)) return 'Opera';
  if (/Firefox\/|FxiOS/.test(ua)) return 'Firefox';
  if (/Chrome\/|CriOS/.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua)) return 'Safari';
  return null;
}

function getOS(ua) {
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Macintosh|Mac OS X/.test(ua)) return 'Mac';
  if (/Windows/.test(ua)) return 'Windows';
  if (/CrOS/.test(ua)) return 'ChromeOS';
  if (/Linux/.test(ua)) return 'Linux';
  return null;
}

// `America/Chicago` -> `Chicago`: the zone's namesake city, usually nearby
function getTimeZoneCity() {
  let zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!zone?.includes('/') || zone.startsWith('Etc/')) return null;
  return zone.split('/').pop().replace(/_/g, ' ');
}

function getReferrer() {
  if (!document.referrer) return null;
  try {
    let host = new URL(document.referrer).hostname;
    if (host === window.location.hostname) return null;
    return REFERRERS.find(([pattern]) => pattern.test(host))?.[1] ?? null;
  } catch {
    return null;
  }
}

async function fetchCity() {
  let controller = new AbortController();
  let timer = window.setTimeout(() => controller.abort(), CITY_TIMEOUT);
  try {
    let response = await fetch('/api/whereami', { signal: controller.signal });
    if (!response.ok) return null;
    let { city } = await response.json();
    return city;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

let factsPromise;
let loadedFacts = null;

// Gather everything once; lines read the result via getLoadedFacts()
export function loadFacts() {
  factsPromise ??= fetchCity().then((city) => {
    let ua = navigator.userAgent;
    loadedFacts = {
      browser: getBrowser(ua),
      os: getOS(ua),
      mobile: /Mobi|iPhone|Android/.test(ua),
      place: city ?? getTimeZoneCity(),
      referrer: getReferrer(),
      visits: getVisits(),
    };
    return loadedFacts;
  });
  return factsPromise;
}

export function getLoadedFacts() {
  return loadedFacts;
}

// the time is read when he speaks, not when the facts load
function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getTimeLine() {
  let now = new Date();
  let hour = now.getHours();
  let weekday = now.getDay() > 0 && now.getDay() < 6;
  if (hour < 5) return `It's ${getTime()}. Shouldn't you be asleep?`;
  if (hour < 7) return `It's ${getTime()}. Up early, or never went to bed?`;
  if (weekday && hour >= 9 && hour < 17) {
    return "Browsing personal sites during work hours? Your secret's safe with me.";
  }
  return null;
}

const BROWSER_LINES = {
  Firefox: 'Firefox? A person of principle.',
  Safari: "Safari. Bold choice for a web developer's site.",
  Chrome: 'Chrome, like everyone else. I respect a crowd-pleaser.',
  Edge: "Edge? I didn't know anyone used that on purpose. We have a lot in common.",
  Opera: 'Opera! I thought I was the only relic here.',
};

const OS_LINES = {
  Mac: "It looks like you're on a Mac. I was born in Office 97 on Windows, but I don't hold it against you.",
  Windows: "Windows! It's like coming home.",
  Linux: 'Linux? You probably compiled your browser yourself.',
  ChromeOS: 'A Chromebook. Is this a school computer?',
};

const REFERRER_LINES = {
  LinkedIn: 'Coming from LinkedIn? Eric is open to opportunities.',
  'Hacker News': 'Welcome, Hacker News. Please be gentle in the comments.',
  Google: "You Googled your way here. I'm flattered.",
  GitHub: 'Came from GitHub? The code is less charming than I am.',
  Reddit: 'A Redditor! Upvote me on your way out.',
  X: 'Came from X? Welcome, I guess.',
};

// every line he can say about this visitor; missing facts are skipped
export function getFactLines(facts) {
  if (!facts) return [];
  let lines = [
    facts.place && {
      animation: 'Searching',
      text: `It looks like you're in ${facts.place}. How's the weather? (I can't see outside.)`,
    },
    BROWSER_LINES[facts.browser] && {
      animation: 'CheckingSomething',
      text: BROWSER_LINES[facts.browser],
    },
    facts.mobile
      ? {
          animation: 'LookDown',
          text: 'Reading this on your phone? On the toilet, I assume.',
        }
      : OS_LINES[facts.os] && { animation: 'GetTechy', text: OS_LINES[facts.os] },
    REFERRER_LINES[facts.referrer] && {
      animation: 'Greeting',
      text: REFERRER_LINES[facts.referrer],
    },
    facts.visits === 2 && {
      animation: 'Congratulate',
      text: "Back again? I knew you'd return.",
    },
    facts.visits > 2 && {
      animation: 'Congratulate',
      text: `Visit #${facts.visits}. At this point we should get coffee.`,
    },
  ];
  let timeLine = getTimeLine();
  if (timeLine) lines.push({ animation: 'Thinking', text: timeLine });
  return lines.filter(Boolean);
}

// "using Firefox on a Mac in Chicago at 11:04 PM", or null if he knows too little
export function getDossier(facts) {
  if (!facts) return null;
  let parts = [
    facts.browser && `using ${facts.browser}`,
    OS_NAMES[facts.os] && `on ${OS_NAMES[facts.os]}`,
    facts.place && `in ${facts.place}`,
  ].filter(Boolean);
  if (parts.length < 2) return null;
  return `It looks like you're ${parts.join(' ')} at ${getTime()}. Not that I'm keeping track.`;
}

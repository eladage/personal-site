import { useEffect, useRef } from 'react';
import { JetBrains_Mono } from 'next/font/google';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/tailwind.css';
import 'focus-visible';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

function usePrevious(value) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname);

  return (
    <>
      {/* set on :root so portals (clippy, confetti) pick up the font too */}
      <style jsx global>{`
        :root {
          --font-mono: ${mono.style.fontFamily};
        }
      `}</style>
      <div className="relative flex flex-auto flex-col">
        <Header />
        <main className="flex-auto">
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  );
}

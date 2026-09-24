// Clippy's "I know where you are" bit. Vercel's edge network geolocates each
// request by IP and passes the result in these headers, so there's no lookup
// service involved. Nothing is logged or stored. Locally the headers are
// absent and this returns nulls.
export const config = { runtime: 'edge' };

function header(req, name) {
  let value = req.headers.get(name);
  if (!value) return null;
  try {
    // city names arrive URI-encoded, e.g. `S%C3%A3o%20Paulo`
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default function handler(req) {
  return new Response(
    JSON.stringify({
      city: header(req, 'x-vercel-ip-city'),
      country: header(req, 'x-vercel-ip-country'),
    }),
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'private, no-store',
      },
    }
  );
}

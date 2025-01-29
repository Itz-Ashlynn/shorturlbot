export default {
  async fetch(request, env) {
      const url = new URL(request.url);
      const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
// Made by https://t.me/Ashlynn_Repository
      if (request.method === 'OPTIONS') {
          return new Response(null, { status: 204, headers });
      }
// Made by https://t.me/Ashlynn_Repository
      if (url.pathname === '/post' && request.method === 'POST') {
          try {
              const { url: longUrl, slug } = await request.json();
              if (!longUrl) throw new Error("Missing 'url' parameter");
              // Made by https://t.me/Ashlynn_Repository
              const shortSlug = slug || Math.random().toString(36).substr(2, 4);
              const shortUrl = `${url.origin}/${shortSlug}`;
              // Made by https://t.me/Ashlynn_Repository
              await env.ashlynn.put(shortSlug, longUrl);
              return new Response(JSON.stringify({ longUrl, shortUrl, creator: "https://t.me/Ashlynn_Repository" }), { headers });
          } catch (error) {
              return new Response(JSON.stringify({ error: error.message }), { status: 400, headers });
          }
      }
// Made by https://t.me/Ashlynn_Repository      
      if (url.searchParams.has('url')) {
          try {
              const longUrl = url.searchParams.get('url');
              if (!longUrl) throw new Error("Missing 'url' parameter");
              // Made by https://t.me/Ashlynn_Repository
              const slug = url.searchParams.get('slug') || Math.random().toString(36).substr(2, 4);
              const shortUrl = `${url.origin}/${slug}`;
              // Made by https://t.me/Ashlynn_Repository
              await env.ashlynn.put(slug, longUrl);
              return new Response(JSON.stringify({ longUrl, shortUrl, creator: "https://t.me/Ashlynn_Repository" }), { headers });
          } catch (error) {
              return new Response(JSON.stringify({ error: error.message }), { status: 400, headers });
          }
      }
// Made by https://t.me/Ashlynn_Repository      
      const slug = url.pathname.substring(1);
      if (slug) {
          try {
              const longUrl = await env.ashlynn.get(slug);
              if (!longUrl) throw new Error("Shortened URL not found");
              return Response.redirect(longUrl, 301);
          } catch (error) {
              return new Response(JSON.stringify({ error: error.message }), { status: 404, headers });
          }
      }
// Made by https://t.me/Ashlynn_Repository
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers });
  }
};
// Made by https://t.me/Ashlynn_Repository

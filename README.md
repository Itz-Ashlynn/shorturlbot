# Cloudflare Workers URL Shortener API

This is a simple and efficient URL shortener API built using Cloudflare Workers and KV Namespace.

## Features
- Supports both **GET** and **POST** requests for URL shortening.
- Allows custom slugs or generates random 4-character slugs.
- Redirects shortened URLs to the original long URL.
- JSON response format with detailed information.
- **CORS support** for cross-origin requests.

---

## 🚀 Deployment Guide

### 1️⃣ Create a Cloudflare Worker
1. Go to [Cloudflare Workers Dashboard](https://dash.cloudflare.com/).
2. Click **Create Application** → **Workers**.
3. Click **Create a Service**.
4. Name your worker (e.g., `url-shortener`).

### 2️⃣ Bind a KV Namespace
1. In the **Workers** tab, navigate to **KV Namespace**.
2. Click **Create a KV Namespace** and name it `ashlynn`.
3. Go back to your **Worker** settings.
4. In **Variables** → **KV Namespace Bindings**, add `ashlynn` as the binding name.

### 3️⃣ Upload Worker Code
1. Open **worker.js** and copy the following code:

   ```javascript
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
   ```

2. Paste it into the Cloudflare Worker editor.
3. Click **Save and Deploy**.

### 4️⃣ Test Your Shortener
#### 🔹 Shorten a URL (GET Request)
```
GET https://your-worker-name.workers.dev/?url=https://example.com
```
#### 🔹 Shorten with a Custom Slug
```
GET https://your-worker-name.workers.dev/?url=https://example.com&slug=custom
```
#### 🔹 Shorten via POST Request
```json
POST https://your-worker-name.workers.dev/post
Content-Type: application/json
{
    "url": "https://example.com",
    "slug": "custom"
}
```
#### 🔹 Redirect from Short URL
```
GET https://your-worker-name.workers.dev/custom
```

### 📌 Notes
- Replace `your-worker-name` with your actual Cloudflare Worker name.
- Ensure `ashlynn` KV Namespace is correctly set up in **Bindings**.

---

## 💡 Author
Created by **[Ashlynn Repository](https://t.me/Ashlynn_Repository)**.

Enjoy! 🚀

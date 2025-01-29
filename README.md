# Cloudflare Workers URL Shortener API

This is a simple and efficient URL shortener API built using Cloudflare Workers and KV Namespace.

## Features
- Supports both **GET** and **POST** requests for URL shortening.
- Allows custom slugs or generates random 4-character slugs.
- Redirects shortened URLs to the original long URL.
- JSON response format with detailed information.
- **CORS support** for cross-origin requests.
- **Improved error handling**.

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
   // Paste your worker.js code here
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

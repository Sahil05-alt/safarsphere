# Safar Sphere
Run locally:
1. `npm run install:all`
2. `cp server/.env.example server/.env` and add GEMINI_API_KEY
3. `npm run dev` (client :5173, server :5000)
Deploy: client -> Vercel (root `client`, build `npm run build`, out `dist`); server -> Render (root `server`, start `npm start`, set env vars incl. CLIENT_ORIGIN).
Edit: placeholders in `client/src/data/*.js`, photos in `client/public/images/<section>/` (names in `siteImages.js`), accent in `client/src/styles/theme.css`.

# AI PDF Assistant

A bilingual PDF workspace with page-aware extraction, summaries and grounded Q&A.

## Stack
React + TypeScript + Vite + Tailwind CSS; Node.js + Express; PDF.js; OpenAI-compatible AI provider.

## Run locally
Requires Node.js 22+.

```bash
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173. API: http://localhost:4000. Add OPENAI_API_KEY to the root .env to enable AI actions. Upload, extraction, preview and keyword search work without an AI key.

## Commands
- npm run dev — client and API
- npm run build — production build
- npm test — server tests
- npm run typecheck — TypeScript validation

Uploads are stored outside the public web root and API keys remain server-side. This initial version uses in-memory document metadata and local disk files; metadata history resets on server restart. Configure durable private storage/database, HTTPS, malware scanning and stronger rate limits before public production deployment.

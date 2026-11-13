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

Uploads are stored outside the public web root and API keys remain server-side. Document metadata and extracted page text are persisted in a private local JSON index, with atomic index replacement to reduce corruption risk. Uploaded PDFs are stored on local disk and survive server restarts when the upload volume is persistent. For multi-instance production deployments, move metadata to Supabase/Postgres and files to private object storage. Configure durable private storage/database, HTTPS, malware scanning and stronger rate limits before public production deployment.

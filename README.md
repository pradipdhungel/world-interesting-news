# World Interesting News

A Node.js news discovery website with country, category, language, search, source attribution, and article brief pages.

## Run Locally

```bash
npm install
npm start
```

The server uses `process.env.PORT` when deployed and falls back to a local port.

## Free Deployment On Render

1. Push this project to a GitHub repository.
2. Open Render and create a new Web Service from that repository.
3. Use these settings:
   - Build command: `npm install`
   - Start command: `npm start`
   - Instance type: Free
4. Deploy the service.

Render can also detect `render.yaml` and create the service automatically as a Blueprint.

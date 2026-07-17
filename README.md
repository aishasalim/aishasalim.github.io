# aishasalim.github.io

Personal portfolio site — React + Vite + Tailwind CSS v4.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
```

## Deploy

```sh
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```

## Docker (optional)

```sh
docker build -t personal-site .
docker run -p 8080:80 personal-site   # http://localhost:8080
```

All visible text/content lives in `src/content.js`; components handle layout only.

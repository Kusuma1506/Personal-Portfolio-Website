# Personal Portfolio Website

A full-stack personal portfolio built with React, Express, and MongoDB. It showcases skills, featured projects, and project data served from a backend API.

## Features

- Responsive React frontend
- Node.js and Express REST API
- MongoDB project model with seed data
- Local JSON fallback for easy demos without MongoDB
- Vercel deployment configuration

## Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```bash
   cp .env.example .env
   ```

3. Start MongoDB locally or set `MONGODB_URI` to a hosted MongoDB connection string.

4. Seed the database:

   ```bash
   npm run seed
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

Frontend: `http://127.0.0.1:5173`

Backend health check: `http://127.0.0.1:5000/api/health`

## API

`GET /api/projects`

Returns all portfolio projects.

`POST /api/projects`

Creates a project.

```json
{
  "title": "Weather App",
  "category": "Full Stack",
  "description": "Forecast app with saved locations.",
  "techStack": ["React", "Express", "MongoDB"],
  "imageUrl": "https://example.com/image.jpg",
  "liveUrl": "https://example.com",
  "repoUrl": "https://github.com/example/repo",
  "featured": true
}
```

## Deploy

### Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Add `MONGODB_URI` in Vercel environment variables.
4. Deploy.

### Netlify

Deploy the frontend with `npm run build` and host the Express API separately, or convert the API routes into Netlify Functions.

## Customize Before Submission

- Replace `Kusuma`, email, and location in `src/main.jsx`.
- Replace placeholder project URLs in `server/data/defaultProjects.js`.
- Add your own projects through MongoDB seed data or the `POST /api/projects` endpoint.

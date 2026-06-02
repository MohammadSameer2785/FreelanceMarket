# FreelanceMarket - MERN Starter Scaffold

Initial project structure for a freelance marketplace using:

- Frontend: React + Vite (JavaScript)
- Backend: Node.js + Express

No authentication or database logic is included in this scaffold.

## Project Structure

```text
FreelanceMarket/
├── backend/
│   ├── src/
│   │   └── server.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm run install:all
```

Run backend only:

```bash
npm run dev:backend
```

Run frontend only:

```bash
npm run dev:frontend
```

Run both from root:

```bash
npm run dev
```

## Default Ports

- Frontend (Vite): `5173`
- Backend (Express): `5000`

# 🎬 CineQuest - Backend

CineQuest is a personal movies and TV shows tracking application that allows users to record what they have watched, rate titles, and write personal reviews — all in one place. It is designed as a **portfolio-quality backend-focused project**, emphasizing clean architecture, API design, authentication, and database modeling.

The core idea behind CineQuest is simple: **track your movie journey and compare your ratings with others**, similar to IMDb, but built from scratch to demonstrate real-world software engineering skills.

CineQuest Backend is a **RESTful API** that powers the CineQuest application.
This service handles **user accounts, ratings, reviews, and watch history**, while fetching movie and TV metadata on-demand from TMDb.

## ✨ Features

- 🔐 JWT-based authentication & authorization
- 👤 User account management
- 🎥 Movie & TV show search (TMDb integration)
- ⭐ Ratings & written reviews
- 🧾 User watch history
- 🧩 Feature-based, scalable architecture

---

## 🛠 Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **PostgreSQL**
- **Neon**
- **JWT (JSON Web Tokens)**
- **TMDb API**

Tooling:

- tsx
- dotenv
- ESM (NodeNext)

---

## 📁 Project Structure

```bash
src/
├── config/
├── db/              # Database layer (repositories, migrations, schema)
├── middlewares/     # Auth & error handling
├── modules/         # Feature-based modules
│   ├── auth/        # Routes, Controller and services
│   ├── watchlist/   # Routes, Controller and services
├── services/        # External services (TMDb API client)
├── types/           # Global/shared TypeScript types
├── utils/           # Shared helpers
├── app.ts           # Express app setup & configuration
└── server.ts        # Server entry point
```

---

## 🔐 Authentication

- Uses **JWT access tokens**
- Tokens are sent via:

```http
Cookie: accessToken=<token>
```

- Auth middleware validates tokens and injects user context into requests

---

## 🎬 TMDb Integration Strategy

- Movie & TV metadata is fetched **on-demand**
- The database stores **only user-related data**:
  - Name
  - Rating
  - Review
  - Timestamps

This avoids duplicating large external datasets and keeps the database lean.

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL
- TMDb API Key

### Installation

```bash
git clone https://github.com/Supanat-pra/cinequest-backend.git
cd cinequest-backend
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/cinequest
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

### Run in Development

```bash
npm run dev
```

---

## 📌 API Overview

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | /auth/register    | Register user            |
| POST   | /auth/login       | Login user               |
| GET    | /movies/search    | Search movies & TV shows |
| POST   | /reviews          | Create rating & review   |
| GET    | /users/me/reviews | Get user watch history   |

---

## 🧠 Design Principles

- Feature-based architecture
- Separation of concerns
- Strong typing with TypeScript

---

## 📈 Future Improvements

- Refresh tokens
- Rate limiting
- Caching (Redis)
- Recommendation engine
- Admin moderation endpoints

---

## 👤 Author

**Supanat Prakobkham**
Web-Application Portfolio Project

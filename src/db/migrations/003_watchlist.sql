CREATE TABLE watchlist (
    watchlist_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    tmdb_id INTEGER NOT NULL,
    review TEXT,
    rating INTEGER CHECK (rating BETWEEN 1 AND 10),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, tmdb_id)
);
ALTER TABLE watchlist
ADD COLUMN media_type TEXT CHECK (media_type IN ('movie', 'tv'));

UPDATE watchlist SET media_type = 'movie';

ALTER TABLE watchlist
ALTER COLUMN media_type SET NOT NULL;

ALTER TABLE watchlist ADD COLUMN poster_path TEXT;

ALTER TABLE watchlist
ADD COLUMN title TEXT;
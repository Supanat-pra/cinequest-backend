ALTER TABLE watchlist
DROP CONSTRAINT watchlist_rating_check;

ALTER TABLE watchlist
ADD CONSTRAINT watchlist_rating_check
CHECK (rating BETWEEN 0 AND 10);
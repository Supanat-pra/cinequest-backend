import dotenv from "dotenv";

dotenv.config();

function validate(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable!: ${name}`);
  }
  return value;
}

export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";

export const env = {
  PORT: Number(process.env.PORT || 5555),
  DATABASE_URL: validate("DATABASE_URL"),
  TMDB_API_KEY: validate("TMDB_API_KEY"),
  TMDB_API_V4_TOKEN: validate("TMDB_API_V4_TOKEN"),
};

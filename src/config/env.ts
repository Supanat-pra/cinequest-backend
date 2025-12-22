import dotenv from "dotenv";

dotenv.config();

function validate(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable!: ${value}`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT || 5555),
  TMDB_API_KEY: validate("TMDB_API_KEY"),
};

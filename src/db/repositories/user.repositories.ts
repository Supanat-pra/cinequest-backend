import { pool } from "../pool.js";

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: Date;
}

interface UserRow extends User {
  password_hash: string;
}

export const UserRepository = {
  async create(
    first_name: string,
    last_name: string,
    email: string,
    username: string,
    password_hash: string,
  ): Promise<User | null> {
    const query =
      "INSERT INTO users(first_name, last_name, email, username, password_hash) VALUES ($1,$2,$3,$4,$5) RETURNING user_id, first_name, last_name, email, username, created_at";
    const values = [first_name, last_name, email, username, password_hash];
    const result = await pool.query<User>(query, values);
    return result.rows[0] ?? null;
  },

  async findByUsername(username: string): Promise<UserRow | null> {
    const query =
      "SELECT user_id, first_name, last_name, email, username, password_hash, created_at FROM users WHERE username=$1";
    const result = await pool.query<UserRow>(query, [username]);
    return result.rows[0] ?? null;
  },

  async findById(user_id: number): Promise<User | null> {
    const query =
      "SELECT user_id, first_name, last_name, email, username, created_at FROM users WHERE user_id=$1";
    const result = await pool.query<User>(query, [user_id]);
    return result.rows[0] ?? null;
  },

  // for forgot password feature, don't use this function for Check first, then act Let the system enforce correctness
  async existsByEmail(email: string): Promise<boolean> {
    const query = "SELECT 1 FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rowCount !== null && result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  },
  async existsByUsername(username: string): Promise<boolean> {
    const query = "SELECT 1 FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);

    if (result.rowCount !== null && result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  },
};

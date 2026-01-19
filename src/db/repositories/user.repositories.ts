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
  ): Promise<User> {
    const query =
      "INSERT INTO users(first_name, last_name, email, username, password) VALUES ($1,$2,$3,$4,$5) RETURNING user_id, first_name, last_name, email, username, created_at";
    const values = [first_name, last_name, email, username, password_hash];
    const result = await pool.query<User>(query, values);
    if (!result.rows[0]) {
      throw new Error("Failed to create user");
    }
    return result.rows[0];
  },

  async findByUsername(username: string): Promise<UserRow> {
    const query = "SELECT * FROM users WHERE username=$1";
    const result = await pool.query<UserRow>(query, [username]);
    if (!result.rows[0]) {
      throw new Error("Invalid username");
    }
    return result.rows[0];
  },

  async findById(user_id: number): Promise<User> {
    const query =
      "SELECT user_id, first_name, last_name, email, username, created_at FROM users WHERE user_id=$1";
    const result = await pool.query<User>(query, [user_id]);
    if (!result.rows[0]) {
      throw new Error("UserNotFound");
    }
    return result.rows[0];
  },

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

export interface AuthUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: Date;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface RegisterInput {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

interface AuthResult {
  user_id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  username: string;
}

export const AuthService = {
  async register(
    user_id: number,
    email: string,
    username: string,
    first_name?: string,
    last_name?: string
  ): Promise<AuthResult> {
    
    const user = 
    return {user}
  },
};

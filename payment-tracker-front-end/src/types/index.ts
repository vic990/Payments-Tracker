export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  user_id: number;
  user_name: string;
  user_lastname: string;
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}

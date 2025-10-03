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

//Borrar todo esto luego
export interface UserMock {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "admin" | "user";
}

export interface Payment {
  id: string;
  amount: number;
  concept: string;
  ownerId: string; // Usuario al que le pertenece el gasto
  payerId: string; // Usuario que realiza el pago
  date: string;
  status: "completed" | "pending" | "failed";
  category: string;
  notes?: string;
}

export interface PaymentFormData {
  amount: number;
  concept: string;
  ownerId: string;
  payerId: string;
  category: string;
  notes?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

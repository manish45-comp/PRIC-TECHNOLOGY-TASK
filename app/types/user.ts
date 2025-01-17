export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  country: string;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  country: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  country: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

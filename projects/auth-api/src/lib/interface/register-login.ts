export interface LoginResBeforeAdabt {
  message: string;
  token: string;
  user: User;
}
export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  _id: string;
  createdAt: string;
}

export interface LoginResAfterAdabt {
  message: string;
  token: string;
  email: string;
}

export interface RegisterData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface SigninData {
  email: string;
  password: string;
}

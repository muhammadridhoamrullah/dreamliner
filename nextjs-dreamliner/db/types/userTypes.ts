export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  fullName?: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

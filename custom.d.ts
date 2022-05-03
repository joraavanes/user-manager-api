
declare namespace Express {
   export interface Request {
      email?: string;
      password?: string;
      fullname: string,
      birthdate: Date,
      lastLogin: Date
   }
}
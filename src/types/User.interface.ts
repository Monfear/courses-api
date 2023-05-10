export interface IUser {
    name: string;
    email: string;
    plainTextPassword: string;
    passwordSalt: string;
    isAdmin: boolean;
};
import { User } from "@/types";
import axios from "axios";

const usersApiUri = process.env.NEXT_PUBLIC_USERS_API_URL;

interface AuthLoginResponse {
    token: string;
    user: User;
}

export async function registerUser(registerUser: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}): Promise<AuthLoginResponse> {
    try {
        const response = await axios.post(`${usersApiUri}/auth/signup`, registerUser);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Registration failed');
    }
}

export async function loginUser(email: string, password: string): Promise<AuthLoginResponse> {
    try {
        const response = await axios.post(`${usersApiUri}/auth/signin`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Login failed');
    }
}

export async function authorizeUser(token: string): Promise<User> {
    try {
        const response = await axios.get(`${usersApiUri}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Authorization failed');
    }
}
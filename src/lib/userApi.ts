import { User } from "@/types";
import axios from "axios";

const usersApiUri = process.env.NEXT_PUBLIC_USERS_API_URL;

export async function fetchUsers(page: number): Promise<{ users: User[], totalPages: number }> {
    page = page - 1;

    try {
        const response = await axios.get(`${usersApiUri}/users`, {
            params: { page },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const users = response.data._embedded?.userDTOes ?? [];
        const totalPages = users.length ? response.data.page.totalPages : 1;

        return { users, totalPages };
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch users');
    }
}
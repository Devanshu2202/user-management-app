import axios from "axios";
import type { User } from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_URL}/users`);

    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/users/${id}`);

    return response.data;
};
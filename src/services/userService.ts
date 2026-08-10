import axios from "axios";
import type { User } from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com";
const STORAGE_KEY = "user-management-users";

/**
 * Get locally stored users.
 */
const getStoredUsers = (): User[] => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);

    return storedUsers ? JSON.parse(storedUsers) : [];
};

/**
 * Save users to localStorage.
 */
const saveUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

/**
 * Fetch all users.
 *
 * JSONPlaceholder provides the initial users.
 * We then merge them with users stored locally.
 */
export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_URL}/users`);

    const apiUsers = response.data;
    const storedUsers = getStoredUsers();

    const apiUserIds = new Set(apiUsers.map((user) => user.id));

    const localOnlyUsers = storedUsers.filter(
        (user) => !apiUserIds.has(user.id)
    );

    const mergedUsers = [...localOnlyUsers, ...apiUsers];

    saveUsers(mergedUsers);

    return mergedUsers;
};

/**
 * Fetch a single user by ID.
 *
 * First checks localStorage so newly created users
 * can also be viewed on the details page.
 */
export const getUserById = async (id: number): Promise<User> => {
    const storedUsers = getStoredUsers();

    const storedUser = storedUsers.find((user) => user.id === id);

    if (storedUser) {
        return storedUser;
    }

    const response = await axios.get<User>(`${API_URL}/users/${id}`);

    return response.data;
};

/**
 * Create a new user.
 *
 * JSONPlaceholder simulates the POST request.
 * We store the returned user locally so the application
 * can continue displaying it after navigation/refresh.
 */
export const createUser = async (
    userData: Omit<User, "id">
): Promise<User> => {
    const response = await axios.post<User>(
        `${API_URL}/users`,
        userData
    );

    const createdUser = response.data;

    const storedUsers = getStoredUsers();

    saveUsers([createdUser, ...storedUsers]);

    return createdUser;
};
import axios from "axios";
import type { User } from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com";
const STORAGE_KEY = "user-management-users";
const DELETED_USERS_KEY = "user-management-deleted-users";

const getStoredUsers = (): User[] => {
    const storedUsers = localStorage.getItem(STORAGE_KEY);

    return storedUsers ? JSON.parse(storedUsers) : [];
};

const saveUsers = (users: User[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const getDeletedUserIds = (): number[] => {
    const storedDeletedIds = localStorage.getItem(DELETED_USERS_KEY);

    return storedDeletedIds ? JSON.parse(storedDeletedIds) : [];
};

const saveDeletedUserIds = (ids: number[]) => {
    localStorage.setItem(DELETED_USERS_KEY, JSON.stringify(ids));
};

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(`${API_URL}/users`);

    const apiUsers = response.data;
    const storedUsers = getStoredUsers();
    const deletedUserIds = getDeletedUserIds();

    const filteredApiUsers = apiUsers.filter(
        (user) => !deletedUserIds.includes(user.id)
    );

    const storedUserMap = new Map(
        storedUsers.map((user) => [user.id, user])
    );

    const mergedApiUsers = filteredApiUsers.map((apiUser) => {
        const storedUser = storedUserMap.get(apiUser.id);

        return storedUser ?? apiUser;
    });

    const apiUserIds = new Set(
        filteredApiUsers.map((user) => user.id)
    );

    const localOnlyUsers = storedUsers.filter(
        (user) => !apiUserIds.has(user.id)
    );

    const mergedUsers = [
        ...localOnlyUsers,
        ...mergedApiUsers,
    ];

    saveUsers(mergedUsers);

    return mergedUsers;
};

export const getUserById = async (id: number): Promise<User> => {
    const storedUsers = getStoredUsers();

    const storedUser = storedUsers.find((user) => user.id === id);

    if (storedUser) {
        return storedUser;
    }

    const response = await axios.get<User>(
        `${API_URL}/users/${id}`
    );

    return response.data;
};

export const createUser = async (
    userData: Omit<User, "id">
): Promise<User> => {
    const response = await axios.post<User>(
        `${API_URL}/users`,
        userData
    );

    const storedUsers = getStoredUsers();

    const localUserIds = storedUsers
        .map((user) => user.id)
        .filter((id) => id >= 1000);

    const nextLocalId =
        localUserIds.length > 0
            ? Math.max(...localUserIds) + 1
            : 1000;

    const createdUser: User = {
        ...response.data,
        id: nextLocalId,
    };

    saveUsers([createdUser, ...storedUsers]);

    return createdUser;
};

export const updateUser = async (
    id: number,
    userData: User
): Promise<User> => {
    const storedUsers = getStoredUsers();

    if (id >= 1000) {
        const updatedUser: User = {
            ...userData,
            id,
        };

        const updatedUsers = storedUsers.map((user) =>
            user.id === id ? updatedUser : user
        );

        saveUsers(updatedUsers);

        return updatedUser;
    }

    const response = await axios.put<User>(
        `${API_URL}/users/${id}`,
        userData
    );

    const updatedUser = response.data;

    const updatedUsers = storedUsers.map((user) =>
        user.id === id ? updatedUser : user
    );

    saveUsers(updatedUsers);

    return updatedUser;
};

export const deleteUser = async (id: number): Promise<void> => {
    if (id >= 1000) {
        const storedUsers = getStoredUsers();

        const updatedUsers = storedUsers.filter(
            (user) => user.id !== id
        );

        saveUsers(updatedUsers);

        return;
    }

    await axios.delete(`${API_URL}/users/${id}`);

    const deletedUserIds = getDeletedUserIds();

    if (!deletedUserIds.includes(id)) {
        saveDeletedUserIds([...deletedUserIds, id]);
    }

    const storedUsers = getStoredUsers();

    const updatedUsers = storedUsers.filter(
        (user) => user.id !== id
    );

    saveUsers(updatedUsers);
};
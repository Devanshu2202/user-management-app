import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import { getUsers } from "../services/userService";
import type { User } from "../types/user";
import { deleteUser } from "../services/userService";

const Home = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteUser(id);

            setUsers((previousUsers) =>
                previousUsers.filter((user) => user.id !== id)
            );
        } catch (error) {
            console.error("Failed to delete user:", error);

            setError("Unable to delete user. Please try again.");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getUsers();

                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setError("Unable to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            User Management
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Manage users with Create, Read, Update and Delete operations.
                        </p>
                    </div>

                    <Link
                        to="/users/new"
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                    >
                        + Add User
                    </Link>
                </div>

                {loading && (
                    <div className="mt-10 flex justify-center">
                        <p className="text-gray-600">Loading users...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {users.map((user) => (
                            <UserCard key={user.id} user={user} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;
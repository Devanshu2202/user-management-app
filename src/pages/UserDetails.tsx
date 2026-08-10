import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/userService";
import type { User } from "../types/user";

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) {
                setError("User ID is missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data = await getUserById(Number(id));

                console.log("data", data)

                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setError("Unable to load user details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-100 px-4 py-8">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-gray-600">Loading user details...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gray-100 px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <Link
                        to="/"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Users
                    </Link>

                    <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
                        {error}
                    </div>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gray-100 px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <Link
                        to="/"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Users
                    </Link>

                    <p className="mt-6 text-gray-600">User not found.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Users
                    </Link>

                    <Link
                        to={`/users/${user.id}/edit`}
                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Edit User
                    </Link>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                    <div className="border-b border-gray-200 p-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {user.name}
                        </h1>

                        <p className="mt-1 text-gray-500">@{user.username}</p>
                    </div>

                    <div className="grid gap-8 p-6 md:grid-cols-2">
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Contact Information
                            </h2>

                            <div className="mt-4 space-y-3 text-sm">
                                <p>
                                    <span className="font-medium text-gray-700">Email:</span>{" "}
                                    {user.email}
                                </p>

                                <p>
                                    <span className="font-medium text-gray-700">Phone:</span>{" "}
                                    {user.phone}
                                </p>

                                <p>
                                    <span className="font-medium text-gray-700">Website:</span>{" "}
                                    {user.website}
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Address
                            </h2>

                            <div className="mt-4 space-y-3 text-sm">
                                <p>
                                    <span className="font-medium text-gray-700">Street:</span>{" "}
                                    {user.address.street}
                                </p>

                                <p>
                                    <span className="font-medium text-gray-700">Suite:</span>{" "}
                                    {user.address.suite}
                                </p>

                                <p>
                                    <span className="font-medium text-gray-700">City:</span>{" "}
                                    {user.address.city}
                                </p>

                                <p>
                                    <span className="font-medium text-gray-700">ZIP:</span>{" "}
                                    {user.address.zipcode}
                                </p>
                            </div>
                        </section>

                        <section className="md:col-span-2">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Company
                            </h2>

                            <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">
                                <p className="font-medium text-gray-900">
                                    {user.company.name}
                                </p>

                                <p className="mt-1 text-gray-600">
                                    {user.company.catchPhrase}
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserDetails;
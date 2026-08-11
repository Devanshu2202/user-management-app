import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/userService";
import type { User } from "../types/user";

const EditUser = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setError("Unable to load user. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!user) return;

        const { name, value } = event.target;

        setUser((previous) => {
            if (!previous) return previous;

            return {
                ...previous,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!user) return;

        try {
            setSaving(true);
            setError("");

            await updateUser(user.id, user);

            navigate(`/users/${user.id}`);
        } catch (error) {
            console.error("Failed to update user:", error);
            setError("Unable to update user. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-100 px-4 py-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-gray-600">Loading user...</p>
                </div>
            </main>
        );
    }

    if (error && !user) {
        return (
            <main className="min-h-screen bg-gray-100 px-4 py-8">
                <div className="mx-auto max-w-3xl">
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
        return null;
    }

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-3xl">
                <Link
                    to={`/users/${user.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    ← Back to User Details
                </Link>

                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Edit User
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Update the user's information.
                        </p>
                    </div>

                    {error && (
                        <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={user.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={user.username}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Phone
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={user.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="website"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Website
                            </label>

                            <input
                                id="website"
                                name="website"
                                type="text"
                                value={user.website}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>

                            <Link
                                to={`/users/${user.id}`}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default EditUser;
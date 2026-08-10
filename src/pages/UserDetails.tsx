import { Link } from "react-router-dom";

const UserDetails = () => {
    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <Link
                    to="/"
                    className="mb-6 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                    ← Back to Users
                </Link>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">
                        User Details
                    </h1>

                    <p className="mt-2 text-gray-600">
                        User details will appear here.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default UserDetails;
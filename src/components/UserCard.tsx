import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface UserCardProps {
    user: User;
    onDelete: (id: number) => void;
}

const UserCard = ({ user, onDelete }: UserCardProps) => {
    return (
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-900">
                {user.name}
            </h2>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
                <p>
                    <span className="font-medium text-gray-800">Email:</span>{" "}
                    {user.email}
                </p>

                <p>
                    <span className="font-medium text-gray-800">Phone:</span>{" "}
                    {user.phone}
                </p>
            </div>

            <div className="mt-4 flex flex-row justify-between gap-2">
                <Link
                    to={`/users/${user.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    View Details
                </Link>

                <Link
                    to={`/users/${user.id}/edit`}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Edit
                </Link>

                <button
                    type="button"
                    onClick={() => onDelete(user.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;
import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface UserCardProps {
    user: User;
}

const UserCard = ({ user }: UserCardProps) => {
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

            <Link
                to={`/users/${user.id}`}
                className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
                View Details →
            </Link>
        </div>
    );
};

export default UserCard;
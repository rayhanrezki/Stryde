import { PropsWithChildren } from "react";
import Sidebar from "@/Components/Sidebar";
import { Link, usePage } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import { User } from "@/types";

interface Props extends PropsWithChildren {
    user?: User;
}

export default function AdminLayout({ children }: Props) {
    const { auth } = usePage().props as { auth: { user: User } };

    return (
        <div className="min-h-screen bg-[#e7e7e3]">
            <Sidebar />
            <main className="pl-[240px]">
                {/* Top Navigation Bar */}
                <div className="bg-white border-b px-8 py-4">
                    <div className="flex justify-end">
                        <div className="flex items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                                        <span>{auth.user.name}</span>
                                        <svg
                                            className="h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}

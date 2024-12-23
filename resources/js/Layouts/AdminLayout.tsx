import Sidebar from "@/Components/Sidebar";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="md:ml-[240px] min-h-screen">
                {/* Mobile Header */}
                <div className="md:hidden h-16 bg-white border-b flex items-center px-4">
                    <h1 className="text-xl font-bold font-rubik">Stryde</h1>
                </div>

                {children}
            </main>
        </div>
    );
}

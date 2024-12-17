import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [quote, setQuote] = useState<string>("Loading..."); // State untuk menyimpan quote
    const [author, setAuthor] = useState<string>(""); // State untuk menyimpan nama author
    const API_KEY = "5LHI20AwEx2XYKb8I9efxhMmtODlDRi9WcMBsaeP"; // Ganti dengan API Key Anda

    const fetchQuote = async () => {
        try {
            const response = await axios.get("http://stryde.test/fetch-quote");
            if (response.data && response.data.length > 0) {
                setQuote(response.data[0]?.quote || "No quote found");
                setAuthor(response.data[0]?.author || "Unknown");
            } else {
                setQuote("No quote found");
                setAuthor("Unknown");
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote("Error fetching quote");
            setAuthor("Unknown");
        }
    };

    // UseEffect untuk memanggil fetchQuote saat komponen dimuat
    useEffect(() => {
        fetchQuote();
    }, []);


    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <p>Welcome to your dashboard!</p>
                </div>

                {/* Quote Section */}
                <div className="bg-gray-100 rounded-xl p-4 mt-6">
                    <h2 className="text-xl font-semibold mb-2">Quote of the Day</h2>
                    <blockquote className="italic text-gray-700">
                        "{quote}"
                    </blockquote>
                    <p className="text-right font-medium">- {author}</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";

const QuoteFetch = () => {
    const [quote, setQuote] = useState<string>("Loading...");
    const [author, setAuthor] = useState<string>("");

    const fetchQuote = async () => {
        try {
            const response = await axios.get(
                "http://strydee.store/fetch-quote"
            );
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

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="bg-gray-100 rounded-xl p-4 mt-6">
            <h2 className="text-xl font-semibold mb-2">Quote of the Day</h2>
            <blockquote className="italic text-gray-700">"{quote}"</blockquote>
            <p className="text-right font-medium">- {author}</p>
        </div>
    );
};

export default QuoteFetch;

import { sendExchangeRequest } from "../services/exchangeService";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BookCard({ book }) {

    console.log("Logged in email:", localStorage.getItem("email"));
console.log("Book owner email:", book.ownerEmail);

    const [loading, setLoading] = useState(false);

    const userEmail = localStorage.getItem("email");

const isOwner =
    userEmail &&
    book.ownerEmail &&
    userEmail.trim().toLowerCase() ===
        book.ownerEmail.trim().toLowerCase();

  // FUNCTION MUST BE INSIDE COMPONENT
  const handleRequest = async () => {

    try {

        setLoading(true);

        await sendExchangeRequest(book.id);

        toast.success("Exchange request sent");

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Request failed"
        );

    } finally {

        setLoading(false);
    }
};

  const tokenEmail = localStorage.getItem("email");

  
  return (
    <div className="shadow-lg rounded-xl overflow-hidden">
      <img
        src={`http://localhost:8080/uploads/${book.imageUrl}`}
        alt={book.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{book.title}</h2>

           <Link
    to={`/books/${book.id}`}
    className="block text-center w-full border p-2 rounded"
>
    View Details
</Link>

       {isOwner ? (
    <button
        disabled
        className="w-full bg-gray-400 text-white p-2 rounded cursor-not-allowed"
    >
        Your Book
    </button>
) : book.availabilityStatus === "AVAILABLE" ? (

    <button
        onClick={handleRequest}
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded"
    >
        {loading ? "Sending..." : "Request Exchange"}
    </button>
) : (
    <button
        disabled
        className="w-full bg-gray-400 text-white p-2 rounded cursor-not-allowed"
    >
        Not Available
    </button>
)}
      </div>
    </div>
  );
}

export default BookCard;

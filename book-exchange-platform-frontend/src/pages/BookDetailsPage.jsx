import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    getBookById,
    deleteBook
} from "../services/bookService";
import { toast } from "react-toastify";

function BookDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (error) {
               toast.error(
    error.response?.data?.message ||
    "Book details not found"
);
            }
        };

        fetchBook();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            await deleteBook(book.id);
            toast.success("Book deleted successfully");
            navigate("/profile");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    if (!book) {
        return <p className="p-6">Loading...</p>;
    }

    const email = localStorage.getItem("email");

    const isOwner =
        email &&
        book.ownerEmail &&
        email.trim().toLowerCase() ===
            book.ownerEmail.trim().toLowerCase();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="shadow-lg rounded-xl overflow-hidden">
                {book.imageUrl ? (
                    <img
                        src={`http://localhost:8080/uploads/${book.imageUrl}`}
                        alt={book.title}
                        className="w-full h-96 object-cover"
                    />
                ) : (
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                        No Image Available
                    </div>
                )}

                <div className="p-6 space-y-3">
                    <h1 className="text-4xl font-bold">
                        {book.title}
                    </h1>

                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Condition: {book.bookCondition}</p>
                    <p>Status: {book.availabilityStatus}</p>
                    <p>Owner: {book.ownerName}</p>
                    <p>Owner Email: {book.ownerEmail}</p>
                    <p>Description: {book.description}</p>

                    {isOwner && (
                        <div className="flex gap-4 pt-4">
                            <Link
                                to={`/books/${book.id}/edit`}
                                className="bg-black text-white px-4 py-2 rounded"
                            >
                                Edit Book
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete Book
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookDetailsPage;
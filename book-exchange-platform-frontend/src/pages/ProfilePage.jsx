import { useEffect, useState } from "react";
import { getMyBooks, deleteBook } from "../services/bookService";
import { Link } from "react-router-dom";

function ProfilePage() {

    const [books, setBooks] = useState([]);

    const email = localStorage.getItem("email");

    const fetchMyBooks = async () => {
        try {
            const data = await getMyBooks();
            setBooks(data);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to load profile");
        }
    };

    useEffect(() => {
        fetchMyBooks();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            await deleteBook(id);
            alert("Book deleted successfully");
            fetchMyBooks();
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-2">
                My Profile
            </h1>

            <p className="mb-8">
                Email: {email}
            </p>

            <h2 className="text-2xl font-bold mb-4">
                My Uploaded Books
            </h2>

            {books.length === 0 ? (
                <p>You have not uploaded any books yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="shadow-lg rounded-xl overflow-hidden"
                        >
                            {book.imageUrl ? (
                                <img
                                    src={`http://localhost:8080/uploads/${book.imageUrl}`}
                                    alt={book.title}
                                    className="w-full h-60 object-cover"
                                />
                            ) : (
                                <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
                                    No Image
                                </div>
                            )}

                            <div className="p-4 space-y-2">
                                <h3 className="text-xl font-bold">
                                    {book.title}
                                </h3>

                                <p>Author: {book.author}</p>
                                <p>Status: {book.availabilityStatus}</p>

                                <Link
                                    to={`/books/${book.id}`}
                                    className="block text-center w-full border p-2 rounded"
                                >
                                    View Details
                                </Link>

                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="w-full bg-red-600 text-white p-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "../services/bookService";
import { toast } from "react-toastify";


function EditBookPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        bookCondition: "",
    });

    useEffect(() => {
        const fetchBook = async () => {
            const data = await getBookById(id);

            setFormData({
                title: data.title || "",
                author: data.author || "",
                genre: data.genre || "",
                description: data.description || "",
                bookCondition: data.bookCondition || "",
            });
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateBook(id, formData);
            toast.success("Book updated successfully");
            navigate(`/books/${id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <form
                onSubmit={handleSubmit}
                className="w-[500px] p-6 shadow-lg rounded-xl space-y-4"
            >
                <h1 className="text-3xl font-bold text-center">
                    Edit Book
                </h1>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Title"
                />

                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Author"
                />

                <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Genre"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Description"
                />

                <input
                    type="text"
                    name="bookCondition"
                    value={formData.bookCondition}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Condition"
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
}

export default EditBookPage;
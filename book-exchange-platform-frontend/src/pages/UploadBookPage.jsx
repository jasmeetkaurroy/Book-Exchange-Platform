import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function UploadBookPage() {

    const [formData, setFormData] = useState({

        title: "",
        author: "",
        genre: "",
        description: "",
        bookCondition: "",
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const uploadData = new FormData();

            uploadData.append(
                "title",
                formData.title
            );

            uploadData.append(
                "author",
                formData.author
            );

            uploadData.append(
                "genre",
                formData.genre
            );

            uploadData.append(
                "description",
                formData.description
            );

            uploadData.append(
                "bookCondition",
                formData.bookCondition
            );

            uploadData.append(
                "image",
                image
            );

            await API.post(
                "/books/upload",
                uploadData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            toast.success("Book uploaded successfully");

        } catch (error) {

            toast.error(
    error.response?.data?.message ||
    "Book upload failed"
);
        }
    };

    return (

        <div className="flex justify-center mt-10">

            <form
                onSubmit={handleSubmit}
                className="w-125 p-6 shadow-lg rounded-xl space-y-4"
            >

                <h1 className="text-3xl font-bold text-center">
                    Upload Book
                </h1>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="bookCondition"
                    placeholder="Condition"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="file"
                    onChange={(e) =>
                        setImage(e.target.files[0])
                    }
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded"
                >
                    Upload Book
                </button>

            </form>

        </div>
    );
}

export default UploadBookPage;
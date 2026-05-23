import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(formData);

            toast.success("User Register Successful");

            navigate("/login");

        } catch (error) {

           toast.error(
    error.response?.data?.message ||
    "User registration failed"
);
        }
    };

    return (

        <div className="flex justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="w-96 p-6 shadow-lg rounded-xl space-y-4"
            >

                <h1 className="text-3xl font-bold text-center">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="w-full border p-2 rounded"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded"
                >
                    Register
                </button>

            </form>

        </div>
    );
}

export default RegisterPage;
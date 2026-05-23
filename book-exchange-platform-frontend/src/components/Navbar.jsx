import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        window.location.reload();
    };

    const token = localStorage.getItem("token");

    return (
        <nav className="flex justify-between items-center p-4 shadow-md">
            <Link to="/" className="text-2xl font-bold">
                Book Exchange
            </Link>

            <div className="space-x-4">
                <Link to="/">Home</Link>

                {token ? (
                    <>
                        <Link to="/upload">Upload</Link>
                        <Link to="/requests">Requests</Link>
                        <Link to="/profile">Profile</Link>

                        <button
                            onClick={handleLogout}
                            className="bg-black text-white px-4 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>

                        
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UploadBookPage from "./pages/UploadBookPage";
import RequestsPage from "./pages/RequestsPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import EditBookPage from "./pages/EditBookPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/upload" element={<UploadBookPage />} />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <RequestsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/books/:id" element={<BookDetailsPage />} />

        <Route
    path="/profile"
    element={
        <ProtectedRoute>
            <ProfilePage />
        </ProtectedRoute>
    }
/>
        <Route
    path="/books/:id/edit"
    element={
        <ProtectedRoute>
            <EditBookPage />
        </ProtectedRoute>
    }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

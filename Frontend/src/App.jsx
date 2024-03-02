import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingOut from "./pages/SingUp";
import Singin from "./pages/Singin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectededRoute";
import CreateListing from "./pages/CreateListing";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Singin />} />
        <Route path="/sign-up" element={<SingOut />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-Listing"
          element={
            <ProtectedRoute>
              <CreateListing />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

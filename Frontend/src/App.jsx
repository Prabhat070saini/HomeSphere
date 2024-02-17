import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingOut from "./pages/SingUp";
import Singin from "./pages/Singin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import About from "./pages/About";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Singin />} />
        <Route path="/sign-up" element={<SingOut />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

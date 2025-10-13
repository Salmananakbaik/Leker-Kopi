import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./pages/Menu";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="font-poppins bg-[#f6f3ec] min-h-screen flex flex-col text-[#3a2e2a]">
        {/* 🔝 NAVBAR */}
        <nav className="flex justify-between items-center px-8 py-4 
                        bg-[#f6f3ec]/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-[#e0d7ca]">
          <h2 className="text-xl font-semibold tracking-wide text-[#5c4033] flex items-center gap-2">
            ☕ <span>Leker Coffee</span>
          </h2>
          <div className="flex gap-8">
            <Link
              to="/"
              className="text-[#5c4033] hover:text-[#8b6f47] transition-colors duration-300 font-semibold"
            >
              Menu
            </Link>
            <Link
              to="/blog"
              className="text-[#5c4033] hover:text-[#8b6f47] transition-colors duration-300 font-semibold"
            >
              Blog
            </Link>
            <Link
              to="/dashboard"
              className="text-[#5c4033] hover:text-[#8b6f47] transition-colors duration-300 font-semibold"
            >
              Dashboard
            </Link>
          </div>
        </nav>

        {/* 🧭 ROUTES */}
        <main className="flex-1 px-6 md:px-12 py-8 animate-fadeIn">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* ⚓ FOOTER */}
        <footer className="text-center py-6 border-t border-[#d7cdbf] bg-[#5c4033] text-[#f6f3ec]">
          <p>
            © {new Date().getFullYear()}{" "}
            <strong className="text-[#f3c623]">Leker Coffee</strong> — Crafted with ☕ by{" "}
            <span className="text-white font-medium">Bogarr</span>
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;

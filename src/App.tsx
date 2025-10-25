import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SAMDefine from "./pages/SAMDefine";
import SAMApplication from "./pages/SAMApplication";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
          {/* Left: Logo or App Name */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold tracking-wide">SAM System</span>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link
              to="/sam-define"
              className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300"
            >
              SAM Define
            </Link>
            <Link
              to="/sam-application"
              className="relative text-gray-300 hover:text-yellow-400 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300"
            >
              SAM Application
            </Link>
          </div>
        </nav>

        {/* Main content fills all remaining space */}
        <main className="flex-1 overflow-auto justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sam-define" element={<SAMDefine />} />
            <Route path="/sam-application" element={<SAMApplication />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

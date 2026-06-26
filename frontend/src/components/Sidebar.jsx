import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");

    const navigate = useNavigate();
};

  return (
    <>
  <button
    className="menu-btn"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ☰
  </button>

  <div
    className={`sidebar ${
      menuOpen ? "show-sidebar" : ""
    }`}
  >
      <div className="sidebar-logo">
        <h2>IEMS</h2>
      </div>

      <div className="sidebar-links">
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "active-link"
              : ""
          }
        >
          Dashboard
        </Link>

        <Link
          to="/income"
          className={
            location.pathname === "/income"
              ? "active-link"
              : ""
          }
        >
          Income
        </Link>

        <Link
          to="/expense"
          className={
            location.pathname === "/expense"
              ? "active-link"
              : ""
          }
        >
          Expenses
        </Link>

        <Link to="/reports">
          Reports
        </Link>

          <ThemeToggle />

        <Link
          to="/"
          onClick={() => {
            localStorage.clear();
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  </>
  );
}

export default Sidebar;
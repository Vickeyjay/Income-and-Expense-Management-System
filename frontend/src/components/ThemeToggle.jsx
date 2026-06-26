import { useEffect, useState } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", dark);

    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  return (
    <button
      className="theme-btn"
      onClick={() => setDark(!dark)}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
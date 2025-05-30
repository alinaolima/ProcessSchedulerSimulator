import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;

export const setDarkMode = () => {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
};

export const setLightMode = () => {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
};

export const loadTheme = () => {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

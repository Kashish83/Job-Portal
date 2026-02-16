export const setUser = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user || user === "undefined") return null;

  try {
    return JSON.parse(user);
  } catch (err) {
    console.error("Invalid user in localStorage", err);
    return null;
  }
};


export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    // remove user form Storage
    localStorage.removeItem("user");

    // Replace current URL with login page URL
    navigate("/login", { replace: true });
  };
  return { logout };
};

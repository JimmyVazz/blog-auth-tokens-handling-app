import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Profile } from "./components/Profile";
import { ProtectedRoute } from "./ProtectedRoute";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      if (location.pathname === "/login" || location.pathname === "/") {
        navigate("/profile");
      }
    }
  }, [token, navigate, location.pathname]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login onToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile token={token} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

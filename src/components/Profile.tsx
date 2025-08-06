import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const [user, setUser] = useState<null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:8000/api/user", {
        credentials: "include",
      });

      if (!res.ok) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

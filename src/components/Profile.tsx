import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = ({ token }: { token: string }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          // Redirect if unauthorized or forbidden
          if (res.status === 401 || res.status === 403) {
            navigate("/login");
            return;
          }

          throw new Error("Unexpected error");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login"); // fallback redirect
      }
    };

    if (token) fetchUser();
    else navigate("/login");
  }, [token, navigate]);

  return (
    <div>
      <h2>Profile</h2>
      {user ? <pre>{JSON.stringify(user, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

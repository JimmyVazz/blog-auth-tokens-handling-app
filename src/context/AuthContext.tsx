import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/user", {
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        setIsAuthenticated(!!data.email);
      } else if (res.status === 401) {
        // Try to refresh token
        const refreshRes = await fetch(
          "http://localhost:8000/api/auth/refresh",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (refreshRes.ok) {
          const retry = await fetch("http://localhost:8000/api/user", {
            credentials: "include",
          });
          if (retry.ok) {
            const data = await retry.json();
            setIsAuthenticated(!!data.email);
            return;
          }
        }

        // Refresh failed
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

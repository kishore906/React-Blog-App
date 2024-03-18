import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "jack@123",
  postsLiked: [],
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      setUser(FAKE_USER);
      setIsAuthenticated(true);
    } else {
      alert("Please Enter valid Email and Password 😉");
    }
  }

  function logout() {
    setUser(null);
    setIsAuthenticated(false);
  }

  function updatePostLiked(id) {
    setUser((prev) => {
      return { ...prev, postsLiked: [...prev.postsLiked, id] };
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updatePostLiked }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext is used before AuthProvider.");
  return context;
}

export { AuthProvider, useAuth };

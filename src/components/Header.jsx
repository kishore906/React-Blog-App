import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handlelogout() {
    logout();
    navigate("/");
  }

  return (
    <header>
      <div className="container display">
        <Link to="/" className="logo">
          <img src="/blog-icon.png" alt="project_logo" />
          <h2>IdeaSphere</h2>
        </Link>

        <div>
          <Link to="/newPost">
            <button className="btn post">Create Post</button>
          </Link>

          {isAuthenticated ? (
            <button className="btn" onClick={handlelogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

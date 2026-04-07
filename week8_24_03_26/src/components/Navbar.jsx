import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#333",
      color: "white",
      padding: "15px 20px",
      marginBottom: "20px"
    }}>
      <div style={{
        display: "flex",
        gap: "20px",
        justifyContent: "flex-start"
      }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Home
        </Link>
        <Link to="/add" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          Add Blog
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
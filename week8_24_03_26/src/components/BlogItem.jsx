import { Link } from "react-router-dom";

function BlogItem({ blog }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "12px",
      margin: "10px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      
      <h3>{blog.title}</h3>
      
      <p>{blog.content}</p>

      <Link to={`/blog/${blog.id}`}>
        <button style={{
          padding: "5px 10px",
          cursor: "pointer"
        }}>
          Read More
        </button>
      </Link>

    </div>
  );
}

export default BlogItem;
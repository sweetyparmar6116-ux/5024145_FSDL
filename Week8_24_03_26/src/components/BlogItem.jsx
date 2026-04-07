import { Link } from "react-router-dom";

function BlogItem({ blog }) {
  return (
    <div className="blog-item">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>

      <Link to={`/blog/${blog.id}`}>
        <button>Read More</button>
      </Link>
    </div>
  );
}

export default BlogItem;
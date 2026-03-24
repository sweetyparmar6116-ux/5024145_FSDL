import { useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";

function BlogDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Blog ID: {id}</h2>
      <p>This is blog content...</p>

      <CommentSection />
    </div>
  );
}

export default BlogDetails;
import { useState } from "react";
import BlogList from "../components/BlogList";

function Home() {
  const [blogs, setBlogs] = useState([
    { id: 1, title: "First Blog", content: "Hello World" },
    { id: 2, title: "Second Blog", content: "React is easy" }
  ]);

  return (
    <div>
      <h2>All Blogs</h2>
      <BlogList blogs={blogs} />
    </div>
  );
}

export default Home;
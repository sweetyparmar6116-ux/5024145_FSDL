import BlogItem from "./BlogItem";

function BlogList({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
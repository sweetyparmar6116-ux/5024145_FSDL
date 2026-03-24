import BlogList from "../components/BlogList";

function Home({ blogs }) {
  return (
    <div>
      <h2>All Blogs</h2>
      <BlogList blogs={blogs} />
    </div>
  );
}

export default Home;
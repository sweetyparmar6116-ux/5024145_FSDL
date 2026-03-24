import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import AddBlog from "./pages/AddBlog";
import Navbar from "./components/Navbar";

function App() {

  const [blogs, setBlogs] = useState([
    { id: 1, title: "First Blog", content: "Hello World" },
    { id: 2, title: "Second Blog", content: "React is easy" }
  ]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/add" element={<AddBlog setBlogs={setBlogs} />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
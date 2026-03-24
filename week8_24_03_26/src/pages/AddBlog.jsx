import { useRef } from "react";

function AddBlog() {
  const titleRef = useRef();
  const contentRef = useRef();

  const handleAdd = () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    alert("Blog Added!");

    titleRef.current.value = "";
    contentRef.current.value = "";
  };

  return (
    <div>
      <h2>Add Blog</h2>

      <input ref={titleRef} placeholder="Title" />
      <br /><br />

      <textarea ref={contentRef} placeholder="Content"></textarea>
      <br /><br />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddBlog;
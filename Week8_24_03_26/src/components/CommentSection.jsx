import { useState, useRef } from "react";

function CommentSection() {
  const [comments, setComments] = useState([]);
  const inputRef = useRef();

  const addComment = () => {
    const text = inputRef.current.value;
    if (!text) return;

    setComments([...comments, text]);

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      <input ref={inputRef} placeholder="Add comment" />
      <button onClick={addComment}>Post</button>

      <ul>
        {comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
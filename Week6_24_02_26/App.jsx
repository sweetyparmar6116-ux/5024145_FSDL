import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setText("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="app">
      <div className="container">
        <h1>📝 To-Do List</h1>

        <div className="summary">
          <div className="total">
            <h4>Total Tasks</h4>
            <p>{totalTasks}</p>
          </div>
          <div className="completed">
            <h4>Completed</h4>
            <p>{completedCount}</p>
          </div>
        </div>

        <form onSubmit={addTask} className="form">
          <input
            type="text"
            placeholder="Enter task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <ul className="task-list">
          {tasks.map((item) => (
            <li
              key={item.id}
              className={item.completed ? "done" : ""}
            >
              <span onClick={() => toggleTask(item.id)}>
                {item.text}
              </span>
              <button onClick={() => deleteTask(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
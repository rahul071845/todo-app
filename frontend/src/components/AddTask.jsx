import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { title: taskTitle };

    axios
      .post("http://localhost:3000/tasks", newTask)
      .then((res) => {
        setResponseMessage(`Task added: "${res.data.title}"`);
        setTimeout(() => navigate("/"), 1000);
        setTaskTitle("");
      })
      .catch(() => {
        setResponseMessage("Failed to add task. Try again.");
      });
  };

  return (
    <div>
      <h1>Add a New Task</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default AddTask;

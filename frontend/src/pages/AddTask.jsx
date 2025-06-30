import TaskForm from "../components/TaskForm";
import { createTask } from "../api/taskApi";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

function AddTask() {
  const navigate = useNavigate();

  const handleCreate = (taskData) => {
    createTask(taskData)
      .then((res) => {
        alert(`Task added: ${res.data.title}`);
        navigate("/");
      })
      .catch(() => {
        alert("Failed to add task");
      });
  };

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "1rem" }}>Add a New Task</h2>
      <div className="add-task-container">
        <TaskForm onSubmit={handleCreate} />
      </div>
    </>
  );
}

export default AddTask;
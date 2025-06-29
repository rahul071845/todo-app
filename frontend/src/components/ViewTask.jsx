import { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem"; // 👈 import it

function ViewTask() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((res) => {
        setAllTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:3000/tasks/${taskId}`)
      .then(() => {
        setAllTasks((prev) => prev.filter((task) => task._id !== taskId));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleComplete = (taskId) => {
  setAllTasks(prev =>
    prev.map(task =>
      task._id === taskId ? { ...task, completed: true } : task
    )
  );
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Tasks</h1>
      <ul>
        {allTasks.map((task) => (
          <TaskItem key={task._id} task={task} onDelete={handleDelete} onComplete={handleComplete} />
        ))}
      </ul>
    </div>
  );
}

export default ViewTask;

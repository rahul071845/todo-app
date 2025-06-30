import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import "./ViewTask.css";
import TaskFilter from "../components/TaskFilter";
import { fetchTasks, deleteTask } from "../api/taskApi";
import TaskSort from "../components/TaskSort";

function ViewTask() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAtNewest");

  const filteredTasks = allTasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return (
            new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity)
          );
        case "title":
          return a.title.localeCompare(b.title);
        case "completed":
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        case "createdAtNewest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "createdAtOldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  useEffect(() => {
    fetchTasks()
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
    deleteTask(taskId)
      .then(() => {
        setAllTasks((prev) => prev.filter((task) => task._id !== taskId));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleComplete = (updatedTask) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="toolbar">
        <label>
          Filter:
          <TaskFilter value={filter} onChange={handleChange} />
        </label>
        <label>
          Sort By:
          <TaskSort value={sortBy} onChange={handleSortChange} />
        </label>
      </div>
      <div>
        {filter === "all" ? (
          <h1>All Tasks</h1>
        ) : filter === "completed" ? (
          <h1>Completed Tasks</h1>
        ) : (
          <h1>Pending Tasks</h1>
        )}
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: "center" }}>No tasks in this category.</p>
        ) : (
          <ul className="card-container">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ViewTask;

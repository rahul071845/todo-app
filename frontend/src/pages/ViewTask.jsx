import { useState, useEffect, useMemo } from "react";
import TaskCard from "../components/TaskCard";
import "./ViewTask.css";
import TaskFilter from "../components/TaskFilter";
import { fetchTasks, deleteTask } from "../api/taskApi";
import TaskSort from "../components/TaskSort";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function ViewTask() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAtNewest");

  const filteredTasks = useMemo(() => {
    const filtered = allTasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity);
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
  }, [allTasks, filter, sortBy]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetchTasks();
        setAllTasks(res.data);
      } catch (err) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setAllTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  };

  const handleComplete = (updatedTask) => {
    setAllTasks(prev => prev.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  const filterLabels = {
    all: "All Tasks",
    completed: "Completed Tasks",
    pending: "Pending Tasks"
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="task-view-container">
      <div className="task-toolbar">
        <div className="task-filter-control">
          <TaskFilter value={filter} onChange={setFilter} />
        </div>
        <div className="task-sort-control">
          <TaskSort value={sortBy} onChange={setSortBy} />
        </div>
      </div>
      
      <h1 className="task-list-title">{filterLabels[filter]}</h1>
      
      {filteredTasks.length === 0 ? (
        <p className="no-tasks-message">No tasks in this category</p>
      ) : (
        <div className="task-grid">
          {filteredTasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewTask;
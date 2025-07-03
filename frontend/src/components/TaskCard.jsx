import { useState } from "react";
import TaskForm from "./TaskForm";
import { completeTask, updateTask } from "../api/taskApi";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import "./TaskCard.css";

function TaskCard({ task, onDelete, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await completeTask(task._id);
      onComplete(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updateTask(task._id, updatedData);
      onComplete(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
  };

  return (
    <li className={`task-card ${task.completed ? "completed" : ""} ${isEditing ? "editing" : ""}`}>
      {isLoading && <LoadingSpinner overlay small />}
      {!isEditing ? (
        <>
          <div className="task-content">
            <h3 className="task-title">{task.title}</h3>
            {task.dueDate && (
              <p className="task-due-date">
                <span className="due-date-label">Due:</span>
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
            {task.completed && (
              <div className="completed-badge">Completed</div>
            )}
          </div>

          <div className="task-actions">
            {!task.completed && (
              <button 
                onClick={handleComplete} 
                className="btn complete-btn"
                disabled={isLoading}
              >
                Completed
              </button>
            )}
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn edit-btn"
              disabled={isLoading}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(task._id)} 
              className="btn delete-btn"
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <div className="task-edit-form">
          {error && <ErrorMessage message={error} dismissable onDismiss={() => setError(null)} />}
          <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
            disabled={isLoading}
          />
        </div>
      )}
    </li>
  );
}

export default TaskCard;
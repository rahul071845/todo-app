import { useState } from "react";
import TaskForm from "./TaskForm";
import { completeTask, updateTask } from "../api/taskApi";

function TaskCard({ task, onDelete, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleComplete = () => {
    completeTask(task._id)
      .then((res) => onComplete(res.data))
      .catch((err) => {
        console.error("Error marking task as completed:", err);
      });
  };

  const handleUpdate = (updatedData) => {
    updateTask(task._id, updatedData)
      .then((res) => {
        onComplete(res.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating task:", err);
        alert("Failed to update task.");
      });
  };

  return (
    <li
      className={`card ${isEditing ? "editing" : ""}`}
      style={{
        textDecoration: task.completed ? "line-through" : "none",
        listStyle: "none",
      }}
    >
      {!isEditing ? (
        <>
          <p className="heading">{task.title}</p>
          <p className="description">
            Due:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </p>
          <div className="btn-container">
            <button onClick={() => onDelete(task._id)} className="btn delete">
              Delete
            </button>
            {!task.completed && (
              <button onClick={handleComplete} className="btn complete">
                Complete
              </button>
            )}
            <button onClick={() => setIsEditing(true)} className="btn edit">
              Edit
            </button>
          </div>
        </>
      ) : (
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </li>
  );
}

export default TaskCard;

import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import { completeTask, updateTask } from "../../api/taskApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./TaskCard.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";

function TaskCard({ task, onDelete, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const response = await completeTask(task._id);
      onComplete(response.data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to complete task";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    setIsLoading(true);
    try {
      const response = await updateTask(task._id, updatedData);
      onComplete(response.data);
      setIsEditing(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to complete task";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    onDelete(task._id);
    setModalOpen(false);
  };

  return (
    <li
      className={`task-card ${task.completed ? "completed" : ""} ${
        isEditing ? "editing" : ""
      }`}
    >
      {isLoading && <LoadingSpinner overlay />}
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
            {task.completed && <div className="completed-badge">Completed</div>}
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
              onClick={() => setModalOpen(true)}
              className="btn delete-btn"
              disabled={isLoading}
            >
              Delete
            </button>
            <ConfirmModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onConfirm={handleConfirmDelete}
              msg="Are you sure you want to delete this task?"
            />
          </div>
        </>
      ) : (
        <div className="task-edit-form">
          <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            disabled={isLoading}
          />
        </div>
      )}
    </li>
  );
}

export default TaskCard;

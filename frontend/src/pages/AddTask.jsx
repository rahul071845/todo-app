import { useState } from "react";
import TaskForm from "../components/TaskForm";
import { createTask } from "../api/taskApi";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";
import LoadingSpinner from "../components/LoadingSpinner";
import SuccessNotification from "../components/SuccessNotification";
import ErrorMessage from "../components/ErrorMessage";

function AddTask() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreate = async (taskData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await createTask(taskData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/", { state: { newTask: response.data } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-task-page">
      <h2 className="page-title">Add a New Task</h2>
      
      <div className="add-task-container">
        {success ? (
          <SuccessNotification 
            message="Task created successfully!" 
            onClose={() => navigate("/")}
          />
        ) : (
          <>
            {error && <ErrorMessage message={error} dismissable onDismiss={() => setError(null)}/>}
            <TaskForm 
              onSubmit={handleCreate} 
              onCancel={handleCancel}
              disabled={isSubmitting}
            />
            {isSubmitting && <LoadingSpinner overlay />}
          </>
        )}
      </div>
    </div>
  );
}

export default AddTask;
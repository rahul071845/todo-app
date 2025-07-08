import { useState } from "react";
import TaskForm from "../../components/TaskForm/TaskForm";
import { createTask } from "../../api/taskApi";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";

function AddTask() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (taskData) => {
    setIsSubmitting(true);
    try {
      const response = await createTask(taskData);
      toast.success("Task added succesfuly");
      navigate("/tasks", { state: { newTask: response.data } });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add task";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/tasks");
  };

  return (
    <div className="add-task-page">
      <h2 className="page-title">Add a New Task</h2>
      <div className="add-task-container">
        <TaskForm
          onSubmit={handleCreate}
          onCancel={handleCancel}
          disabled={isSubmitting}
        />
      </div>
      {isSubmitting && <LoadingSpinner overlay />}
    </div>
  );
}

export default AddTask;

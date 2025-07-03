import { useState } from "react";
import "./TaskForm.css";

function TaskForm({ initialData = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("Title cannot be empty");
      return;
    }
    onSubmit({ title: trimmedTitle, dueDate: dueDate || null });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="task-form-group">
        <label htmlFor="task-title">
          Title *
          <input
            value={title}
            type="text"
            placeholder="Enter task title"
            id="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </label>
      </div>

      <div className="task-form-group">
        <label htmlFor="dueDate">
          Due Date
          <input
            value={dueDate}
            type="date"
            id="dueDate"
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
      </div>

      <div className="task-form-actions">
        <button type="submit" className="task-btn primary">
          Save
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="task-btn secondary" 
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
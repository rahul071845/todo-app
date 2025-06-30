import { useState, useEffect } from "react";

function TaskForm({ initialData = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Title can not be empty");
      return;
    }
    onSubmit({ title: title.trim(), dueDate: dueDate || null });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="card">
        <label htmlFor="title" className="heading">
          Title
          <input
            value={title}
            type="text"
            placeholder="Enter task title"
            id="title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="dueDate" className="description">
          Due Date
          <input
            value={dueDate}
            type="date"
            id="dueDate"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <span className="btn-container">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          {onCancel && (
            <button type="button" className="btn btn-danger" onClick={onCancel}>
              Cancel
            </button>
          )}
        </span>
      </form>
    </>
  );
}

export default TaskForm;
function TaskSort({ value, onChange }) {
  return (
    <div className="task-sort">
      <label htmlFor="sort" className="task-sort-label">
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="task-sort-select"
      >
        <option value="createdAtNewest">Newest First</option>
        <option value="createdAtOldest">Oldest First</option>
        <option value="dueDate">Due Date</option>
        <option value="title">Title (A–Z)</option>
        <option value="completed">Completion Status</option>
      </select>
    </div>
  );
}

export default TaskSort;

function TaskFilter({ value, onChange }) {
  return (
    <div className="task-filter">
      <label htmlFor="filter" className="task-filter-label">
        Filter:
      </label>
      <select
        id="filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="task-filter-select"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="pending">Pending Tasks</option>
      </select>
    </div>
  );
}

export default TaskFilter;

function TaskSort({ value, onChange}) {
  return (
    <>
      <select value={value} onChange={onChange}>
        <option value="createdAtNewest">Newest First</option>
        <option value="createdAtOldest">Oldest First</option>
        <option value="dueDate">Due Date</option>
        <option value="title">Title (A–Z)</option>
        <option value="completed">Completion Status</option>
      </select>
    </>
  );
}

export default TaskSort;

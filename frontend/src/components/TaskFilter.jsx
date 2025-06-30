function TaskFilter({value, onChange}) {
  return (
    <>
      <select value={value} onChange={onChange}>
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="pending">Pending Tasks</option>
      </select>
    </>
  );
}

export default TaskFilter;

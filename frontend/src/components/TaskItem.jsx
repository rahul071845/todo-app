import axios from "axios";

function TaskItem({ task, onDelete, onComplete }) {
  const handleComplete = () => {
    axios
      .put(`http://localhost:3000/tasks/${task._id}/complete`)
      .then(() => {
        onComplete(task._id);
      })
      .catch((err) => {
        console.error("Error marking task as completed:", err);
      });
  };

  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      {task.title}
      <button onClick={() => onDelete(task._id)}>Delete</button>
      {!task.completed && <button onClick={handleComplete}>Complete</button>}
    </li>
  );
}

export default TaskItem;

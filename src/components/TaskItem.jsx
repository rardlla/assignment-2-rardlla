function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <label>{task.text}</label>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem

import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [taskText, setTaskText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (taskText.trim() === '') {
      return
    }

    onAdd(taskText.trim())
    setTaskText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
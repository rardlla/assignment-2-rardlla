import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import TaskCounter from './components/TaskCounter'
import TaskForm from './components/TaskForm'

import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import checkIcon from './assets/check_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'

// Assignment 2: build the Task Manager here.
// Step 1 (after the Oct 12 class): hard-coded tasks, the five components, props.
// Step 2 (after the Oct 19 class): useState, the controlled form, toggle, delete, filtering.
function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Mom', completed: false },
    { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
    { id: 3, text: 'Return the textbook to Josie', completed: false },
    { id: 4, text: 'Buy the new album by Rake', completed: false },
    { id: 5, text: 'Buy a gift card for Dad', completed: false }
  ])

  const [filter, setFilter] = useState('all')

  function toggleTask(id) {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    }))
  }

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed
    }

    if (filter === 'completed') {
      return task.completed
    }

    return true
  })

  return (
    <>
      <header>
        <img src={menuIcon} alt="Menu" className="menu-icon" />

        <form className="quick-find" onSubmit={(event) => event.preventDefault()}>
          <img src={searchIcon} alt="Search" className="search-icon" />
          <input
            type="text"
            name="quick-find"
            placeholder="Quick find"
            aria-label="Quick find"
          />
        </form>

        <TaskCounter
          total={tasks.length}
          completed={tasks.filter((task) => task.completed).length}
        />
      </header>

      <nav>
        <ul className="nav-menu">
          <li>
            <a href="#inbox" className="nav-link">
              <img src={inboxIcon} alt="" />
              Inbox
              <small className="task-count">{tasks.length}</small>
            </a>
          </li>
          <li>
            <a href="#inbox" className="nav-link">
              <img src={calendarIcon} alt="" />
              Today
              <small className="task-count">5</small>
            </a>
          </li>
          <li>
            <a href="#inbox" className="nav-link">
              <img src={upcomingIcon} alt="" />
              Upcoming
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <section id="inbox">
          <h1>Inbox</h1>

          <div className="task-filters">
            <button
              type="button"
              className={filter === 'all' ? 'selected' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>

            <span>|</span>

            <button
              type="button"
              className={filter === 'active' ? 'selected' : ''}
              onClick={() => setFilter('active')}
            >
              Active
            </button>

            <span>|</span>

            <button
              type="button"
              className={filter === 'completed' ? 'selected' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />

          <TaskForm onAdd={addTask} />
        </section>
      </main>
    </>
  )
}

export default App
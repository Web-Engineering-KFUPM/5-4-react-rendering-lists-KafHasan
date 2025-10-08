import { useState } from "react";
import TaskItem from "./TaskItem";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const allDone = course.tasks.length > 0 && course.tasks.every(t => t.isDone);

  function toggleTask(id) {
    onMutateCourse(index, (prev) => ({
      ...prev,
      tasks: prev.tasks.map(t =>
        t.id === id ? { ...t, isDone: !t.isDone } : t
      ),
    }));
  }

  function deleteTask(id) {
     onMutateCourse(index, (prev) => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id),
    }));
  }

  function addTask(e) {
    e.preventDefault();
    e.preventDefault();
    const text = title.trim();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      title: text,
      dueDate: date || null,
      isDone: false,
    };

    onMutateCourse(index, (prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));

    setTitle("");
    setDate("");
  }

  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
         {allDone && <span className="badge success">All caught up</span>}

      </header>
{(course.tasks.length) === 0 ? (
        <p className="emptyMsg">No tasks yet. Add your first one below.</p>
      ) : (
<ul className="tasks">
{course.tasks.map((task)=>(
<TaskItem
key={task.id}
task={task}
onToggle={toggleTask}
onDelete={deleteTask}
/>
))}
</ul>
)}
    
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </article>
  );
}

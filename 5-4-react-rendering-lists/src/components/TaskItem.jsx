import DueBadge from "./DueBadge";

export default function TaskItem({ task, onToggle, onDelete }) {
  const isDone = !!task.isDone;
  return (
    <li className="task" key={task.id}>
      <label className="taskMain">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => onToggle(task.id)}
        />
      </label>
{!task.isDone && <DueBadge dueDate={task.dueDate} />}
     
      <button className="ghost" aria-label="Delete task"  
      onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
}

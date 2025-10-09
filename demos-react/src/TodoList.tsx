import { useState } from "react";

interface Todo {
  id: number;
  text: string;
}

function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");

  return <div>
    <form onSubmit={e => {
      e.preventDefault();
      if (newTask.trim()) {
        setTasks([...tasks, { id: Date.now(), text: newTask }]);
        setNewTask("");
      }
    }}>
      <input type="text" placeholder="Add a new task" value={newTask} onChange={e => setNewTask(e.target.value)} />
      <button type="submit">Add</button>
    </form>
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          {task.text}
          <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>Delete</button>
        </div>
      ))}
    </div>
  </div>;
}

export default TodoList;
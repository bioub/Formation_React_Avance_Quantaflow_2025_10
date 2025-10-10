import type { Todo } from "./types";

type Props = {
  todos: Todo[];
  onDelete: (todo: Todo) => void;
}

function TodosList({ todos, onDelete }: Props) {
  console.log('render TodosList');
  return (
    <div className="TodosList">
      {todos.map((t) => (
        <div key={t.id}>
          {t.text}
          <button onClick={() => onDelete(t)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default TodosList;
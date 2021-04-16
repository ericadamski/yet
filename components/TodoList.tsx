import React from "react";

import Todo from "./Todo";
import useTodos from "hooks/useTodos";

export default function TodoList() {
  const [notCompletedTodos, completedTodos, loading] = useTodos();
  const hasTodos = notCompletedTodos.length + completedTodos.length > 0;

  if (loading) {
    return <div>loading</div>;
  }

  if (!hasTodos) {
    return <div>What! You have nothing to do! Good for you.</div>;
  }

  return (
    <div>
      {notCompletedTodos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
      Completed
      {completedTodos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </div>
  );
}

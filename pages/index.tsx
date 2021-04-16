import { useEffect, useState } from "react";

import { TodoAddInput } from "components/TodoAddInput";
import TodoList from "components/TodoList";
import useUser from "hooks/useUser";
import Button from "components/Button";

export default function Home() {
  const [user] = useUser();
  const [addingTodo, setAddingTodo] = useState<boolean>(false);
  const isLoggedIn = user != null;

  useEffect(() => {
    const handleNewTodo = (event: KeyboardEvent) => {
      setAddingTodo((isOpen) => {
        if (event.shiftKey && event.key.toLowerCase() === "n" && !isOpen) {
          event.preventDefault();
          return true;
        }

        if (event.key === "Escape" && isOpen) {
          event.preventDefault();
          return false;
        }

        return isOpen;
      });
    };

    document.addEventListener("keydown", handleNewTodo);

    return () => document.removeEventListener("keydown", handleNewTodo);
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <div className="page">
        {addingTodo ? (
          <div className="page__add-todos" onClick={() => setAddingTodo(false)}>
            <TodoAddInput onAddTodo={() => setAddingTodo(false)} />
          </div>
        ) : null}
        <TodoList />
        <div className="page__add-task-button">
          <Button onClick={() => setAddingTodo(true)}>
            Add task{" "}
            <span className="key-group">
              <span className="key-group__key">⬆ Shift</span> +{" "}
              <span className="key-group__key">N</span>
            </span>
          </Button>
        </div>
      </div>
      <style jsx>{`
        .page {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page__add-todos {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .key-group {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
        }

        .key-group__key {
          padding: 0.125rem 0.25rem;
          border: 1px solid var(--black);
          border-radius: 0.25rem;
          font-weight: bold;
          font-size: 0.75rem;
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }

        .key-group__key:first-child {
          margin-left: 0;
        }

        .key-group__key:last-child {
          margin-right: 0;
        }

        .page__add-task-button {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
        }
      `}</style>
    </>
  );
}

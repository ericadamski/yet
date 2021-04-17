import { useEffect, useState } from "react";

import { TodoAddInput } from "components/TodoAddInput";
import TodoList from "components/TodoList";
import useUser from "hooks/useUser";
import Button from "components/Button";
import * as User from "lib/user";

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
    return (
      <>
        <div className="page">
          <div className="page__hero">
            <h1>Yet™️ another TODO app.</h1>

            <Button invert onClick={User.signIn}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/vectors/github-icon.svg"
                  style={{ height: "1.5rem", marginRight: "0.5rem" }}
                />
                Join now
              </span>
            </Button>
            <Button
              style={{ borderColor: "transparent", marginTop: "0.5rem" }}
              onClick={User.signIn}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                Sign in
              </span>
            </Button>
          </div>
        </div>
        <style jsx>{`
          .button-group {
            display: flex;
            flex-direction: column;
          }

          .page__hero h1 {
            max-width: 400px;
            font-size: 3rem;
            margin-bottom: 4rem;
          }

          .page__hero {
            background: var(--white);
            padding: 2rem;
            border-radius: 1rem;
            display: flex;
            flex-direction: column;
          }

          .page {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: var(--pink);
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="page">
        {addingTodo ? (
          <div className="page__add-todos">
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
          padding: 4rem 0;
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

        .page__add-task-button {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
        }
      `}</style>
    </>
  );
}

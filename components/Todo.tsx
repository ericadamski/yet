import classNames from "classnames";
import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  KeyboardEvent,
} from "react";
import { useForm } from "react-hook-form";

import * as TodoModel from "lib/todo";
import { Todo as TodoType } from "../types/todo";
import useUser from "hooks/useUser";
import useOnClickOutside from "hooks/useOnClickOutside";
import mergeRefs from "utils/mergeRefs";
import CheckEmpty from "vectors/CheckEmpty";
import Edit from "vectors/Edit";
import CheckComplete from "vectors/CheckComplete";
import Bin from "vectors/Bin";
import Checkmark from "vectors/Checkmark";
import Back from "vectors/Back";

interface Props {
  todo: TodoType;
}

interface FormData {
  content: string;
}

export default function Todo(props: Props) {
  const [user] = useUser();
  const { register, handleSubmit, setFocus, reset } = useForm<FormData>({
    defaultValues: {
      content: props.todo.text_content,
    },
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(props.todo.complete);
  const inflightComplete = useRef<NodeJS.Timeout>(null);
  const inputRef = useRef<HTMLInputElement>();
  const inputRegInfo = register("content");

  useOnClickOutside(inputRef, () => setEditing(false));

  const handleEdit = useCallback(
    ({ content }: FormData) => {
      if (content.length < 1) {
        TodoModel.destroy(user, props.todo.id);
      } else {
        TodoModel.update(user, props.todo.id, content);
      }

      setEditing(false);
    },
    [user, props.todo.id]
  );

  const handleDelete = useCallback(() => {
    TodoModel.destroy(user, props.todo.id);
  }, [user, props.todo.id]);

  const handleMarkComplete = useCallback(() => {
    if (inflightComplete.current != null) {
      clearTimeout(inflightComplete.current);
    }

    setCompleted((currentCompleteState) => {
      if (props.todo.complete != !currentCompleteState) {
        inflightComplete.current = setTimeout(() => {
          // delay the actual commit of marking complete
          TodoModel.markComplete(user, props.todo.id, currentCompleteState);
        }, 1000);
      }

      return !currentCompleteState;
    });
  }, [user, props.todo.complete, completed]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Escape") {
      setEditing(false);
      reset();
    }
  }, []);

  useEffect(() => {
    if (editing) {
      setFocus("content");
      (document.activeElement as HTMLInputElement).select();
    }
  }, [editing]);

  return (
    <>
      <div
        className={classNames("todo", { complete: completed })}
        onDoubleClick={() => setEditing(!completed)}
      >
        <button className="icon todo__complete" onClick={handleMarkComplete}>
          {completed ? <CheckComplete /> : <CheckEmpty />}
        </button>
        <div className="todo__content-container">
          {editing ? (
            <form onKeyDown={handleKeyDown} onSubmit={handleSubmit(handleEdit)}>
              <input
                {...inputRegInfo}
                ref={mergeRefs([inputRef, inputRegInfo.ref])}
              />
              <input hidden type="submit" />
            </form>
          ) : (
            <p className="todo__content">{props.todo.text_content}</p>
          )}
        </div>
        <div className="todo__actions">
          {completed ? null : (
            <button
              className="icon todo__action"
              onClick={() => setEditing(!completed)}
            >
              <Edit />
            </button>
          )}
          <button className="icon todo__action" onClick={handleMarkComplete}>
            {completed ? <Back /> : <Checkmark />}
          </button>
          <button className="icon todo__action" onClick={handleDelete}>
            <Bin />
          </button>
        </div>
      </div>
      <style jsx>{`
        .icon {
          width: 1.5rem;
          height: 1.5rem;
          background: transparent;
          padding: 0;
          margin-right: 0.25rem;
          border: none;
        }

        .todo__actions:hover .icon {
          opacity: 0.3;
        }

        .todo__actions:hover .icon:hover {
          opacity: 1;
        }

        .todo {
          position: relative;
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          align-items: center;
        }

        .todo__actions {
          position: absolute;
          right: 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          visibility: hidden;
        }

        .todo:hover > .todo__actions {
          visibility: visible;
        }

        .todo__content-container {
          flex-grow: 1;
          font-size: 1rem;
          cursor: text;
        }

        .todo__content-container form {
          flex-grow: 1;
        }

        .todo__content {
          margin: 0;
          padding: 0.5rem;
        }

        .todo.complete .todo__content {
          text-decoration: line-through;
        }

        .todo__content-container input {
          border-radius: 0.25rem;
          font-size: 1rem;
          width: 100%;
          background: var(--white);
          border: none;
          outline: none;
          padding: 0.5rem;
        }

        .todo__complete {
          width: 2rem;
          height: 2rem;
          padding: 0;
          border: none;
          background: transparent;
        }

        .todo__complete:focus,
        .todo__complete:active {
          outline: none;
        }
      `}</style>
    </>
  );
}

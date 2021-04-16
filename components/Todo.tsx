import classNames from "classnames";
import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  KeyboardEvent,
} from "react";
import { useForm } from "react-hook-form";

import Button from "./Button";
import * as TodoModel from "lib/todo";
import { Todo as TodoType } from "../types/todo";
import useUser from "hooks/useUser";
import useOnClickOutside from "hooks/useOnClickOutside";
import mergeRefs from "utils/mergeRefs";

interface Props {
  todo: TodoType;
}

interface FormData {
  content: string;
}

export default function Todo(props: Props) {
  const [user] = useUser();
  const { register, handleSubmit, setFocus } = useForm<FormData>({
    defaultValues: {
      content: props.todo.text_content,
    },
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(props.todo.complete);
  const inflightComplete = useRef<NodeJS.Timeout>(null);
  const inputRef = useRef<HTMLInputElement>();
  const inputRegInfo = register("content", { required: true });

  useOnClickOutside(inputRef, () => setEditing(false));

  const handleEdit = useCallback(
    ({ content }: FormData) => {
      TodoModel.update(user, props.todo.id, content);
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

    if (props.todo.complete != !completed) {
      inflightComplete.current = setTimeout(() => {
        // delay the actual commit of marking complete
        TodoModel.markComplete(user, props.todo.id, completed);
      }, 1000);
    }

    setCompleted(!props.todo.complete);
  }, [user, props.todo.complete, completed]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Escape") {
      setEditing(false);
    }
  }, []);

  useEffect(() => {
    if (editing) {
      setFocus("content");
    }
  }, [editing]);

  return (
    <>
      <div
        className={classNames("todo", { complete: completed })}
        onDoubleClick={() => setEditing(true)}
      >
        <Button className="todo__complete" onClick={handleMarkComplete}>
          empty
        </Button>
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
        <div className="todo__actions">
          {completed ? null : (
            <Button className="todo__action" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
          <Button className="todo__action" onClick={handleMarkComplete}>
            {completed ? "It's not done!" : "Finished!"}
          </Button>
          <Button className="todo__action" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      <style jsx>{`
        .todo {
          display: flex;
          width: 100%;
          flex-wrap: nowrap;
          align-items: center;
        }
      `}</style>
    </>
  );
}

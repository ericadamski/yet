import React, {
  useRef,
  useEffect,
  useCallback,
  MouseEventHandler,
} from "react";
import { useForm } from "react-hook-form";

import * as Todo from "lib/todo";
import useUser from "hooks/useUser";
import useCategories from "hooks/useCategories";
import { Category } from "types/categories";
import Typeahead from "./Typeahead";

interface Props {
  onAddTodo: () => void;
}

interface FormData {
  category: Category["id"];
  content: string;
}

export function TodoAddInput(props: Props) {
  const formRef = useRef<HTMLFormElement>();
  const [user] = useUser();
  const [categories] = useCategories();
  const {
    register,
    handleSubmit,
    getValues,
    setFocus,
    reset,
  } = useForm<FormData>();

  const handleItemCreate = useCallback(
    async (data?: FormData) => {
      const { category, content } = data ?? getValues();

      reset();
      props.onAddTodo();
      await Todo.create(user, content, category);
    },
    [getValues, user]
  );

  useEffect(() => {
    setFocus("content");
  }, []);

  return (
    <>
      <form
        ref={formRef}
        className="todo-input"
        onSubmit={handleSubmit<FormData>(handleItemCreate)}
      >
        <input
          autoComplete="off"
          className="todo-input__input"
          {...register("content", { required: true })}
        />
        <Typeahead<Category>
          elements={categories}
          itemToString={(cat) => cat?.title}
          getItemValue={(cat) => cat?.id}
          getDefaultValue={getDefaultCategory}
          {...register("category")}
        />
        <input type="submit" hidden onClick={stopPropagation} />
      </form>
      <style jsx>{`
        .todo-input {
          width: max(20vw, 200px);
          display: flex;
          flex-wrap: nowrap;
        }

        .todo-input__input {
          width: 100%;
          height: 3rem;
          border-radius: 0.25rem;
          border: 1px solid var(--black);
          transition: all 0.05s ease;
          will-change: border-color, box-shadow;
          padding: 0 0.5rem;
          font-size: 1rem;
          font-weight: 300;
        }

        .todo-input__input:focus,
        .todo-input__input:active {
          outline: none;
          border-color: transparent;
          box-shadow: 0 1.1px 2.2px rgba(0, 0, 0, 0.02),
            0 2.7px 5.3px rgba(0, 0, 0, 0.028), 0 5px 10px rgba(0, 0, 0, 0.035),
            0 8.9px 17.9px rgba(0, 0, 0, 0.042),
            0 16.7px 33.4px rgba(0, 0, 0, 0.05), 0 40px 80px rgba(0, 0, 0, 0.07);
        }
      `}</style>
    </>
  );
}

function getDefaultCategory(cats: Category[]): Category | undefined {
  return cats.find((cat) => cat.title === "Default");
}

function stopPropagation(event) {
  event.stopPropagation();
}

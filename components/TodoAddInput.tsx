import React, { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";

import * as Todo from "lib/todo";
import * as CategoryModel from "lib/category";
import useUser from "hooks/useUser";
import useCategories from "hooks/useCategories";
import { Category } from "types/categories";
import Typeahead from "./Typeahead";
import TabKey from "vectors/TabKey";

interface Props {
  onAddTodo: () => void;
}

interface FormData {
  category?: Category["id"];
  content: string;
}

enum EditingStage {
  Content = "content",
  Category = "category",
}

export function TodoAddInput(props: Props) {
  const [editingStage, setEditingStage] = useState<EditingStage>(
    EditingStage.Content
  );
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
      const {
        category = getDefaultCategory(categories).id.toString(),
        content,
      } = data ?? getValues();
      let categoryId = category;

      if (category.toString().includes("new:")) {
        categoryId = await CategoryModel.create(
          user,
          category.split("new:").pop()
        );
      }

      reset();
      props.onAddTodo();
      await Todo.create(user, content, categoryId);
    },
    [getValues, user, categories]
  );

  useEffect(() => {
    setFocus(editingStage);
  }, [editingStage]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLFormElement>) => {
      if (event.key === "Tab") {
        event.stopPropagation();
        event.preventDefault();
        setEditingStage((stage) => getNextEditingStage(stage));
      }
    },
    []
  );

  const nameIsTaken = useCallback(
    (categoryName: string) => {
      const categoryNames = categories.map(({ title }) => title.toLowerCase());

      return categoryNames.includes(categoryName.toLowerCase());
    },
    [categories]
  );

  const categoryInputReg = register("category");

  return (
    <>
      <form
        className="todo-input"
        onSubmit={handleSubmit<FormData>(handleItemCreate)}
        onKeyDown={handleKeyPress}
      >
        {editingStage === EditingStage.Content && (
          <div className="todo-input__stage-container">
            <p className="todo-input__stage-header">Task</p>
            <input
              autoComplete="off"
              className="todo-input__input"
              {...register("content", { required: true })}
            />
          </div>
        )}
        {editingStage === EditingStage.Category && (
          <div className="todo-input__stage-container">
            <p className="todo-input__stage-header">Category</p>
            <Typeahead<Category>
              elements={categories}
              itemToString={(cat) => cat?.title}
              getItemValue={(cat) => cat?.id}
              getDefaultValue={getDefaultCategory}
              makeNewItem={(title, color) =>
                !nameIsTaken(title) && {
                  id: `new:${title}`,
                  title,
                  color,
                  creator_id: user.id,
                  created_at: Date.now(),
                }
              }
              {...categoryInputReg}
            />
          </div>
        )}
        <div className="todo-input__hint">
          <TabKey style={{ marginRight: "0.25rem" }} /> Tab to edit the{" "}
          {getNextEditingStage(editingStage)}
        </div>
        <input type="submit" hidden />
      </form>
      <style jsx>{`
        .todo-input {
          width: max(20vw, 200px);
          display: flex;
          flex-direction: column;
        }

        .todo-input__hint {
          display: flex;
          align-items: center;
          color: var(--white);
          font-weight: 300;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .todo-input__stage-container {
          background: var(--white);
          border-radius: 0.25rem;
        }

        .todo-input__stage-header {
          padding: 0 0.5rem;
          padding-top: 0.5rem;
          font-size: 0.75rem;
          margin-bottom: -1rem;
          z-index: 2;
          color: rgba(15, 14, 23, 0.6);
          font-weight: 300;
        }

        .todo-input__input {
          width: 100%;
          height: 3rem;
          border: none;
          border-radius: 0.25rem;
          padding: 0 0.5rem;
          font-size: 1rem;
          font-weight: 300;
          background: transparent;
        }

        .todo-input__input:focus,
        .todo-input__input:active {
          outline: none;
        }
      `}</style>
    </>
  );
}

function getDefaultCategory(cats: Category[]): Category | undefined {
  return cats.find((cat) => cat.title === "Default");
}

function getNextEditingStage(stage: EditingStage) {
  return stage === EditingStage.Content
    ? EditingStage.Category
    : EditingStage.Content;
}

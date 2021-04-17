import React, { useMemo } from "react";

import Todo from "./Todo";
import useTodos from "hooks/useTodos";
import { Todo as TodoType } from "types/todo";
import useCategories from "hooks/useCategories";
import { Category } from "types/categories";

export default function TodoList() {
  const [notCompletedTodos, completedTodos, loading] = useTodos();
  const [categories] = useCategories();
  const hasTodos = notCompletedTodos.length + completedTodos.length > 0;
  const categoriesById = useMemo(() => {
    return categories.reduce((cats, cat) => {
      cats.set(cat.id, cat);

      return cats;
    }, new Map<string, Category>());
  }, [categories]);
  const categoriesByName = useMemo(() => {
    return categories.reduce((cats, cat) => {
      cats.set(cat.title, cat);

      return cats;
    }, new Map<string, Category>());
  }, [categories]);
  const todosByCategory = useMemo(() => {
    if (categories.length < 1) return [];

    return Array.from(
      notCompletedTodos
        .reduce((groups, todo) => {
          const category = categoriesById.get(todo.category_id);
          if (!groups.has(category.title)) {
            groups.set(category.title, []);
          }

          groups.get(category.title).push(todo);

          return groups;
        }, new Map<string, TodoType[]>())
        .entries()
    );
  }, [notCompletedTodos, categoriesById]);

  if (loading) {
    return <div>loading</div>;
  }

  if (!hasTodos) {
    return <div>What! You have nothing to do! Good for you.</div>;
  }

  return (
    <>
      <div className="todo-list">
        {todosByCategory.map(([category, todos]) => {
          return (
            <div className="todo-list__group" key={category}>
              <div className="todo-list__group-container">
                <div
                  className="todo-list__group-color"
                  style={{ background: categoriesByName.get(category).color }}
                />
                <p className="todo-list__group-title">
                  {category === "Default"
                    ? "Stuff you're tryin' to do"
                    : category}
                </p>
              </div>
              <div className="todo-list__nest">
                {todos.map((todo) => {
                  return <Todo key={todo.id} todo={todo} />;
                })}
              </div>
            </div>
          );
        })}
        <div className="todo-list__group">
          <div className="todo-list__group-container">
            <p className="todo-list__group-title">Things you've done</p>
          </div>
          <div className="todo-list__nest">
            {completedTodos.map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .todo-list {
          display: flex;
          align-items: start;
          flex-direction: column;
          width: max(40vw, 250px);
        }

        .todo-list__group {
          width: 100%;
        }

        .todo-list__group-container {
          display: flex;
          align-items: center;
          padding: 1rem 0;
        }

        .todo-list__group-title {
          font-size: 1.5rem;
          padding-left: 0.5rem;
        }

        .todo-list__nest {
          background: var(--off-white);
          padding: 1rem;
          border-radius: 0.25rem;
        }

        .todo-list__group-color {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
}

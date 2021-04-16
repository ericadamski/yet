import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Todo } from "types/todo";

import { Supabase } from "utils/supabase";

export default function useTodos(): [Todo[], Todo[], boolean] {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const handleInsert = (todo: SupabaseRealtimePayload<Todo>) => {
      setTodos((todos) => [todo.new, ...todos]);
    };

    const handleUpdate = (todo: SupabaseRealtimePayload<Todo>) => {
      setTodos((todos) => {
        const copy = [...todos];

        const modifiedIdx = todos.findIndex((t) => t.id === todo.new.id);

        if (modifiedIdx < 0) {
          return todos;
        }

        copy.splice(modifiedIdx, 1, todo.new);

        return copy;
      });
    };

    const handleDelete = (todo: SupabaseRealtimePayload<Todo>) => {
      setTodos((todos) => {
        const copy = [...todos];

        const modifiedIdx = todos.findIndex((t) => t.id === todo.old.id);

        if (modifiedIdx < 0) {
          return todos;
        }

        copy.splice(modifiedIdx, 1);

        return copy;
      });
    };

    const sub = Supabase()
      .from<Todo>("todos")
      .on("INSERT", handleInsert)
      .on("UPDATE", handleUpdate)
      .on("DELETE", handleDelete)
      .subscribe();

    Supabase()
      .from<Todo>("todos")
      .select()
      .order("created_at", { ascending: false })
      .order("completed_at", { ascending: true })
      .then(({ data }) => {
        setInitialLoad(false);
        setTodos(data);
      });

    return () => {
      Supabase().removeSubscription(sub);
    };
  }, []);

  return [
    todos.filter(({ complete }) => !complete),
    todos.filter(({ complete }) => complete),
    initialLoad,
  ];
}

import { User } from "@supabase/gotrue-js";
import { Category } from "types/categories";
import { Todo } from "types/todo";

import { Supabase } from "utils/supabase";

export async function create(owner: User, content: string, categoryId: string) {
  const { data } = await Supabase()
    .from<Todo>("todos")
    .insert([
      {
        creator_id: owner.id,
        text_content: content,
        category_id: categoryId,
      },
    ]);

  return data;
}

export async function getCategory(owner: User, id: string) {
  const { data } = await Supabase()
    .from<Category>("categories")
    .select()
    .match({ creator_id: owner.id, id })
    .single();

  return data;
}

export async function destroy(owner: User, id: string) {
  await Supabase().from<Todo>("todos").delete().match({
    creator_id: owner.id,
    id,
  });
}

export async function update(owner: User, id: string, content: string) {
  await Supabase().from<Todo>("todos").update({ text_content: content }).match({
    creator_id: owner.id,
    id,
  });
}

export async function markComplete(owner: User, id: string, reverse?: boolean) {
  await Supabase()
    .from<Todo>("todos")
    .update({
      complete: !reverse,
      completed_at: !reverse ? new Date() : null,
    })
    .match({
      creator_id: owner.id,
      id,
    });
}

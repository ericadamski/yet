import { User } from "@supabase/gotrue-js";
import { Category } from "types/categories";
import stringToColor from "string-to-color";

import { Supabase } from "utils/supabase";

export async function create(owner: User, title: string) {
  const { data } = await Supabase()
    .from<Category>("categories")
    .insert(
      [
        {
          creator_id: owner.id,
          title,
          color: stringToColor(title),
        },
      ],
      { returning: "representation" }
    )
    .single();

  return data.id;
}

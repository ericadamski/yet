import { SupabaseRealtimePayload } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Category } from "types/categories";

import { Supabase } from "utils/supabase";

export default function useCategories(): [Category[], boolean] {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleInsert = (cat: SupabaseRealtimePayload<Category>) =>
      setCategories((cats) => [...cats, cat.new]);

    const handleUpdate = (cat: SupabaseRealtimePayload<Category>) =>
      setCategories((categories) => {
        const copy = [...categories];

        const modifiedIdx = categories.findIndex(
          (category) => category.id === cat.new.id
        );

        if (modifiedIdx < 0) {
          return categories;
        }

        copy.splice(modifiedIdx, 1, cat.new);

        return copy;
      });

    const sub = Supabase()
      .from<Category>("categories")
      .on("INSERT", handleInsert)
      .on("UPDATE", handleUpdate)
      .subscribe();

    Supabase()
      .from<Category>("categories")
      .select()
      .then(({ data }) => {
        setLoading(false);
        setCategories(data);
      });

    return () => {
      Supabase().removeSubscription(sub);
    };
  }, []);

  return [categories, loading];
}

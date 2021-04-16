import { User } from "@supabase/gotrue-js";
import { useState, useEffect } from "react";

import * as UserModel from "lib/user";

export default function useUser(): [User, boolean, () => void] {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUser(UserModel.get());
    setLoading(false);

    const sub = UserModel.onAuthChange((event) => {
      if (event === "SIGNED_OUT") {
        setUser(undefined);
      }
    });

    return sub.data.unsubscribe;
  }, []);

  return [user, loading, UserModel.signOut];
}

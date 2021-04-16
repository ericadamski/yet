import { useEffect } from "react";
import Router from "next/router";

import useUser from "hooks/useUser";
import * as User from "lib/user";
import Button from "components/Button";

export default function JoinPage() {
  const [user] = useUser();

  useEffect(() => {
    if (user != null) {
      Router.push("/");
    }
  }, [user]);

  return <Button onClick={User.signIn}>Sign up</Button>;
}

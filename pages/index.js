import { Text, Button } from "@chakra-ui/react";
import Link from "next/link";

import LabelButton from "components/LabelButton";

export default function Home() {
  const handleFetch = async () => {
    const response = await fetch("/api/user/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "",
    });

    if (response.ok) {
      alert(`You did it! ${JSON.stringify(await response.json())}`);
    } else {
      alert(`That didn't work ${response.status}`);
    }
  };

  return (
    <>
      <Text fontSize="3xl">Welcome to our home</Text>
      <Button onClick={handleFetch}>Fetch backend route</Button>
      <LabelButton label="Test me" onClick={handleFetch}>
        Click on this
      </LabelButton>
    </>
  );
}

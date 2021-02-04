import { Text, Flex, Button } from "@chakra-ui/react";
import React from "react";

export default function LabelButton({ label, ...props }) {
  return (
    <Flex direction="column">
      <Text>{label}</Text>
      <Button {...props} />
    </Flex>
  );
}

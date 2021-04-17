import React from "react";

export default function CheckEmpty(props: React.HTMLProps<SVGElement>) {
  return (
    // @ts-ignore
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 4.5H24C24.828 4.5 25.5 5.17131 25.5 6V24C25.5 24.8289 24.8289 25.5 24 25.5H6C5.17114 25.5 4.5 24.8289 4.5 24V6C4.5 5.17114 5.17114 4.5 6 4.5Z"
        stroke="var(--black)"
      />
    </svg>
  );
}

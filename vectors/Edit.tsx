import React from "react";

export default function Edit(props: React.HTMLProps<SVGElement>) {
  return (
    // @ts-ignore
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.8281 3C22.3164 3 21.8046 3.19544 21.4141 3.58594L19 6L24 11L26.4141 8.58594C27.1951 7.80494 27.1951 6.53881 26.4141 5.75781L24.2422 3.58594C23.8517 3.19544 23.3399 3 22.8281 3ZM17 8L5.25977 19.7402C5.25977 19.7402 6.17753 19.658 6.51953 20C6.86153 20.342 6.58 22.58 7 23C7.42 23.42 9.64389 23.1244 9.96289 23.4434C10.2819 23.7624 10.2598 24.7402 10.2598 24.7402L22 13L17 8ZM4 23L3.05664 25.6719C3.01956 25.7773 3.00041 25.8882 3 26C3 26.2652 3.10536 26.5196 3.29289 26.7071C3.48043 26.8946 3.73478 27 4 27C4.11177 26.9996 4.22268 26.9804 4.32812 26.9434C4.33139 26.9421 4.33464 26.9408 4.33789 26.9395L4.36328 26.9316C4.36524 26.9303 4.36719 26.929 4.36914 26.9277L7 26L5.5 24.5L4 23Z"
        fill="var(--black)"
      />
    </svg>
  );
}
import React from "react";

export default function CheckComplete(props: React.HTMLProps<SVGElement>) {
  return (
    // @ts-ignore
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 4.5H24C24.828 4.5 25.5 5.17131 25.5 6V24C25.5 24.8289 24.8289 25.5 24 25.5H6C5.17114 25.5 4.5 24.8289 4.5 24V6C4.5 5.17114 5.17114 4.5 6 4.5ZM14.5006 19.6206L22.0606 12.0606C22.6468 11.4743 22.6468 10.5257 22.0606 9.93945C21.4743 9.35318 20.5257 9.35318 19.9394 9.93945L13.44 16.4389L11.0476 14.0464C10.4613 13.4602 9.51271 13.4602 8.92645 14.0464C8.34018 14.6327 8.34018 15.5813 8.92645 16.1676L12.3785 19.6196C12.3787 19.6198 12.3789 19.62 12.3791 19.6202C12.6608 19.9031 13.0435 20.06 13.44 20.06C13.8376 20.06 14.2188 19.9023 14.5006 19.6206Z"
        fill="var(--black)"
        stroke="var(--black)"
      />
    </svg>
  );
}

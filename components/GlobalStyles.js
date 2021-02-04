export default function GlobalStyles({ children }) {
  return (
    <>
      {/* Add any global style that won't fit into chakra here */}
      <style jsx global>{`
        :root {
          --font: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        }

        *,
        * > * {
          font-family: var(--font);
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

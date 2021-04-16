export default function GlobalStyles() {
  return (
    <>
      <style jsx global>{`
        :root {
          --font: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;

          --black: #000;
          --white: #fff;
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

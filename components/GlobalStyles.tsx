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
          --off-white: #f5f6f8;
          --pink: #f25f4c;
        }

        .key-group {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
        }

        .key-group__key {
          padding: 0.125rem 0.25rem;
          border: 1px solid var(--black);
          border-radius: 0.25rem;
          font-weight: bold;
          font-size: 0.75rem;
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }

        .key-group__key:first-child {
          margin-left: 0;
        }

        .key-group__key:last-child {
          margin-right: 0;
        }

        *,
        html,
        body,
        * > * {
          font-family: var(--font);
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  );
}

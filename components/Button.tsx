import React, { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLButtonElement> {}

export default function Button(props: Props) {
  return (
    <>
      {/* @ts-ignore */}
      <button {...props} />
      <style jsx>{`
        button {
          padding: 0.5rem 0.5rem;
          border-radius: 0.25rem;
          border: 1px solid var(--black);
          font-size: 1rem;
          font-weight: 300;
          background: var(--white);
          transition: transform 0.1s ease, box-shadow 0.2s ease,
            border-color 0.2s ease;
          will-change: transform, box-shadow, border-color;
          transform: scale(1);
          cursor: pointer;
        }

        button:hover,
        button:focus,
        button:active {
          outline: none;
          border-color: transparent;
          transform: scale(1.015);
          box-shadow: 0 0px 3.1px rgba(0, 0, 0, 0.034),
            0 0px 7.4px rgba(0, 0, 0, 0.048), 0 0px 14px rgba(0, 0, 0, 0.06),
            0 0px 25px rgba(0, 0, 0, 0.072), 0 0px 46.8px rgba(0, 0, 0, 0.086),
            0 0px 112px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </>
  );
}

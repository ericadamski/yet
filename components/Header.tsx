import useUser from "hooks/useUser";
import React from "react";
import Avatar from "./Avatar";
import Button from "./Button";

export default function Header() {
  const [user, loading, signOut] = useUser();

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <p>Yet™️</p>
        </div>
        <div className="header__filler" />
        <div className="header__user">
          {loading || user == null ? (
            <Button>Go to app</Button>
          ) : (
            <Avatar user={user} onSignOut={signOut} />
          )}
        </div>
      </div>
      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          width: 100vw;
          min-height: 3rem;
          padding: 1rem;
          box-sizing: border-box;
          background: var(--white);
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .header__filler {
          flex-grow: 1;
        }
      `}</style>
    </>
  );
}

import { User } from "@supabase/gotrue-js";
import React, { useRef, useState } from "react";

import useOnClickOutside from "hooks/useOnClickOutside";
import Menu from "vectors/Menu";

interface Props {
  user: User;
  onSignOut: () => void;
}

export default function Avatar(props: Props) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>();
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  const toggleMenu = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  const firstName = props.user.user_metadata.full_name?.split(" ").shift();
  const initials =
    props.user.user_metadata.full_name?.split(" ").map((s) => s.charAt(0)) ??
    [];
  const { 0: firstInitial, [initials.length - 1]: lastInitial } = initials;

  return (
    <>
      <div className="avatar">
        <div className="avatar__image">
          {props.user.user_metadata.avatar_url?.length > 0 ? (
            <img src={props.user.user_metadata.avatar_url} />
          ) : (
            <span>
              {firstInitial}
              {lastInitial}
            </span>
          )}
        </div>
        <p className="avatar__name">{firstName}</p>
        <div className="avatar__menu" ref={menuRef}>
          <button className="menu__button" onClick={toggleMenu}>
            <Menu />
          </button>
          {menuOpen && (
            <ul>
              <li>
                <button onClick={props.onSignOut}>Sign out</button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <style jsx>{`
        .avatar {
          display: flex;
          align-items: center;
        }

        .avatar__image {
          height: 2.5rem;
          width: 2.5rem;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar__image img {
          max-width: 100%;
        }

        .avatar__name {
          padding: 0 0.5rem;
        }

        .menu__button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          padding: 0;
          border: none;
          width: 1.5rem;
          height: 1.5rem;
        }

        .avatar__menu {
          position: relative;
        }

        .avatar__menu ul {
          background: var(--white);
          padding: 0;
          position: absolute;
          top: 125%;
          left: -200px;
          list-style: none;
          margin: 0;
          border-radius: 0.25rem;
          min-width: 200px;
          box-shadow: 0 1px 2.2px rgba(0, 0, 0, 0.02),
            0 2.3px 5.3px rgba(0, 0, 0, 0.028),
            0 4.4px 10px rgba(0, 0, 0, 0.035),
            0 7.8px 17.9px rgba(0, 0, 0, 0.042),
            0 14.6px 33.4px rgba(0, 0, 0, 0.05), 0 35px 80px rgba(0, 0, 0, 0.07);
        }

        .avatar__menu ul li button {
          padding: 0.5rem;
          width: 100%;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

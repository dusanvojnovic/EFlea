import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Header: React.FunctionComponent = () => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      } else {
        return;
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  function handleDropdownClick() {
    setDropdownVisible((prevState) => !prevState);
  }

  function handleMenuItemClick(event: React.MouseEvent<HTMLLIElement>) {
    setDropdownVisible(false);
    event.stopPropagation()
  }

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <header className="fixed top-0 left-0 z-30 h-[4.5rem] w-full bg-green text-[1.75rem] text-white">
      <div className="flex justify-between py-[1rem] px-[3rem]">
        <Link href="/">
          <a>E-Flea</a>
        </Link>
        {!session ? (
          <div className="cursor-pointer">
            <Link href="/register">
              <a className="mx-[1rem]">Register</a>
            </Link>
            <Link href="/login">
              <a className="mx-[1rem]">Login</a>
            </Link>
          </div>
        ) : (
          <div ref={dropdownMenuRef}>
            <div
              className="mx-[1rem] cursor-pointer"
              onClick={handleDropdownClick}
            >
              My Account
              {dropdownVisible && (
                <div className="absolute top-[4.5rem] right-0 w-[15rem] origin-top animate-grow-down rounded-bl-lg bg-green pt-[1rem] pb-[2rem] pl-[3rem] pr-[3rem] text-white	">
                  <ul className="m-0 list-none text-[1.5rem]">
                    <li
                      onClick={(event) => handleMenuItemClick(event)}
                      className="cursor-pointer border-b border-dotted px-0 py-[0.75rem]"
                    >
                      <Link href={`/user/${session?.user?.id}`}>My Items</Link>
                    </li>
                    <li
                      onClick={(event) => handleMenuItemClick(event)}
                      className="cursor-pointer border-b border-dotted px-0 py-[0.75rem]"
                    >
                      <Link href={`/user/${session?.user?.id}/edit`}>
                        Edit account
                      </Link>
                    </li>
                    <li
                      className="cursor-pointer border-b border-dotted px-0 py-[0.75rem]"
                      onClick={(event) => {
                        handleMenuItemClick(event);
                        logout();
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

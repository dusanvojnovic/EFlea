import Link from "next/link";
import React, { useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export const Header: React.FunctionComponent = () => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  function closeDropdownMenu(e: MouseEvent) {
    if (
      dropdownMenuRef.current &&
      dropdownVisible &&
      !dropdownMenuRef.current.contains(e.target as Node)
    ) {
      setDropdownVisible(false);
    }
  }

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  if (typeof window !== "undefined") {
    document.addEventListener("mousedown", closeDropdownMenu);
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
          <div
            className="mx-[1rem] cursor-pointer"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            My Account
          </div>
        )}
        {dropdownVisible && (
          <div
            ref={dropdownMenuRef}
            className="absolute top-[4.5rem] right-0 w-[15rem] origin-top animate-grow-down rounded-bl-lg bg-green pt-[1rem] pb-[2rem] pl-[3rem] pr-[3rem] text-white	"
          >
            <ul className="m-0 list-none text-[1.5rem]">
              <li className="cursor-pointer border-b border-dotted px-0 py-[0.75rem]">
                My Items
              </li>
              <li className="cursor-pointer border-b border-dotted px-0 py-[0.75rem]">
                Edit Account
              </li>
              <li
                className="cursor-pointer border-b border-dotted px-0 py-[0.75rem]"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

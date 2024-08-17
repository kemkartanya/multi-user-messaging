import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { LuMessageCircle } from "react-icons/lu";

const Header = () => {
  return (
    <header className="flex justify-between p-4 text-[#9296DB]">
      <a href="/">Message AnyOne!</a>
      <div className="flex justify-between gap-4 items-center">
        <a href="/inbox">
          <LuMessageCircle className="text-2xl" />
        </a>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { LuMessageCircle } from "react-icons/lu";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <header className="flex justify-between p-4 text-[#9296DB]">
      <a href="/">Message AnyOne!</a>

      {user?.username ? (
        <div className="flex justify-between gap-4 items-center">
          <a href="/inbox">
            <LuMessageCircle className="text-2xl" />
          </a>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {/* <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li> */}
              {/* <li>
                <a>Settings</a>
              </li> */}
              <li onClick={() => handleLogout()}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <a href="/login">
          <span className="">Sign in</span>
        </a>
      )}
    </header>
  );
};

export default Header;

//icons
import { IoMdSunny, IoMdMoon } from "react-icons/io";

import { Link } from "react-router-dom";

import { NavLinks } from "../components";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";

function themeLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

function Navbar() {
  const logout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  const [theme, setTheme] = useState(themeLocalStorage);
  const handleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLinks />
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onClick={handleTheme}
              type="checkbox"
              checked={theme == "dracula"}
              readOnly
            />

            {/* sun icon */}
            <IoMdSunny className="swap-on fill-current w-7 h-7" />

            {/* moon icon */}
            <IoMdMoon className="swap-off fill-current w-7 h-7" />
          </label>
        </button>
        <div className="flex items-center gap-4">
          <p className="">{user.displayName}</p>
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={user.photoURL} />
            </div>
          </div>
          <button onClick={logout} className="btn btn-secondary">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

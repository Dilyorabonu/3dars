// Import necessary icons from react-icons
import {
  IoMdSunny,
  IoMdMoon,
  IoMdSearch,
  IoMdNotifications,
} from "react-icons/io";

// Import required modules from react-router-dom and other libraries
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { NavLinks } from "../components";

// Import Firebase and Redux modules
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/userSlice";

// Function to get the current theme from localStorage
function themeLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Function to handle user logout
  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success(`See you soon, ${user.displayName}`);
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [theme, setTheme] = useState(themeLocalStorage);

  // Function to toggle the theme
  const handleTheme = () => {
    const newTheme = theme === "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  // Use effect to set the theme in the document and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 p-4 md:p-6 lg:p-8">
      {/* Navbar start section */}
      <div className="navbar-start flex items-center">
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
        <Link to="/" className="btn btn-ghost text-xl md:text-2xl lg:text-3xl">
          Todos Website
        </Link>
      </div>
      {/* Navbar end section */}
      <div className="navbar-end flex items-center">
        <button className="btn btn-ghost btn-circle">
          <label className="swap swap-rotate">
            <input
              onClick={handleTheme}
              type="checkbox"
              checked={theme === "dracula"}
              readOnly
            />
            <IoMdSunny className="swap-on fill-current w-6 h-6" />
            <IoMdMoon className="swap-off fill-current w-6 h-6" />
          </label>
        </button>
        <div className="flex items-center gap-4">
          <p className="text-sm md:text-base lg:text-lg">{user.displayName}</p>
          <div className="avatar">
            <div className="w-8 md:w-10 lg:w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                }
                alt=""
              />
            </div>
          </div>
          <button
            onClick={logOut}
            className="btn btn-secondary text-sm md:text-base lg:text-lg"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

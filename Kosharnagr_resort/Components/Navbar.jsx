import { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import data from "../Data/data.json";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar container */}
      <div className="fixed top-0 left-0 w-full bg-white p-7 flex justify-around items-center border-b border-gray-200 shadow-sm z-[100] md:gap-[75px]">
        
        {/* Logo */}
        <div className="text-2xl text-black font-bold font-serif">
          {data.companyInfo.name}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <ul className="flex gap-10 text-lg items-center">
            {data.navigation.map((item, i) => (
              <li key={i} className="relative group cursor-pointer text-black">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `transition duration-200 group-hover:text-slate-400 ${
                      isActive ? "text-slate-400" : ""
                    }`
                  }
                >
                  {item.label}
                </NavLink>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-3xl cursor-pointer z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
<div
  className={`fixed top-20 left-0 w-full bg-white border-y border-gray-200 shadow-md transition-all duration-300 ease-in-out z-[90] ${
    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
  } md:hidden`}
>
  <ul className="flex flex-col gap-4 px-6 py-6 text-lg font-medium">
    {data.navigation.map((item, i) => (
      <li key={i}>
        <NavLink
          to={item.path}
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) =>
            `group border border-gray-400 rounded-xl w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-all relative overflow-hidden block ${
              isActive ? "text-slate-500" : "text-black"
            }`
          }
        >
          <span className="relative z-10 group-hover:text-slate-500 transition duration-200">
            {item.label}
          </span>
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      </li>
    ))}
  </ul>
</div>

    </>
  );
}

export default Navbar;

import {
  Bag2,
  SearchNormal1,
  User,
  HamburgerMenu,
  CloseSquare,
} from "iconsax-reactjs";
import { useState, useEffect } from "react";

const menuItems = [
  { id: 1, label: "Home", href: "/", active: true },
  { id: 2, label: "Menu", href: "#" },
  { id: 3, label: "Representation", href: "#" },
  { id: 4, label: "About us", href: "#" },
  { id: 5, label: "Contact us", href: "#" },
];

function MenuBar({ isOpen }) {
  return (
    <nav
      className={`
        ${isOpen ? "flex" : "hidden"} 
        md:flex flex-col md:flex-row 
        items-start justify-center gap-4 md:gap-6 
        absolute md:static top-16 left-0 w-full md:w-auto
        bg-neutral-800 rounded-2xl md:bg-transparent
        p-4 md:p-0 
        z-20 transition-all
      `}>
      <ul className="text-emerald-600 flex flex-col md:flex-row items-left justify-center gap-3">
        {menuItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className={`p-1 text-base md:text-sm lg:text-base transition-colors border-b-2 ${
                item.active
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent hover:border-emerald-400 hover:text-emerald-400"
              }`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ قفل کردن اسکرول وقتی منو باز است
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // اسکرول غیرفعال
    } else {
      document.body.style.overflow = "auto"; // اسکرول فعال
    }

    // ✅ پاکسازی در هنگام خروج از کامپوننت
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className="rounded-2xl w-full mx-auto bg-neutral-800 flex flex-row items-center justify-between p-2 md:p-3 relative">
      {/* Logo */}
      <img
        alt="Logo Tarkhine"
        className="w-28 md:w-32 lg:w-40"
        src="/image/Logo.png"
      />

      {/* Menu toggle (mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-xl bg-neutral-700 hover:bg-neutral-600">
        {isOpen ? (
          <CloseSquare variant="Linear" color="#00bc7d" />
        ) : (
          <HamburgerMenu variant="Linear" color="#00bc7d" />
        )}
      </button>

      {/* Menu */}
      <MenuBar isOpen={isOpen} />

      {/* Icons */}
      <div className="hidden md:flex flex-row-reverse gap-2 md:gap-3 lg:gap-4">
        <a
          href="#"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <User variant="Bold" color="#00bc7d" size="22" />
        </a>
        <a
          href="#"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <Bag2 variant="Bold" color="#00bc7d" size="22" />
        </a>
        <a
          href="#"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <SearchNormal1 variant="Bold" color="#00bc7d" size="22" />
        </a>
      </div>
    </header>
  );
}

export default Header;

import {
  Bag2,
  SearchNormal1,
  User,
  HamburgerMenu,
  CloseSquare,
} from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// مسیرهای منو
const menuItems = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Menu", href: "/menu" },
  { id: 3, label: "Representation", href: "/representation" },
  { id: 4, label: "About us", href: "/about" },
  { id: 5, label: "Contact us", href: "/contact" },
];

function MenuBar({ isOpen }) {
  const location = useLocation();

  return (
    <nav
      className={`${
        isOpen ? "flex" : "hidden"
      } md:flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6 
      absolute md:static top-16 left-0 w-full md:w-auto bg-neutral-800 
      rounded-2xl md:bg-transparent p-4 md:p-0 z-30 transition-all`}>
      <ul className="text-emerald-600 flex flex-col md:flex-row items-left justify-center gap-3">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              className={`p-1 text-base md:text-sm lg:text-base transition-colors border-b-2 ${
                location.pathname === item.href
                  ? "border-emerald-500 text-emerald-400"
                  : "border-transparent hover:border-emerald-400 hover:text-emerald-400"
              }`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* آیکون‌ها و جستجو برای موبایل */}
      <div className="flex md:hidden flex-row justify-start gap-3 mt-4 w-full">
        <Link
          to="/profile"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 transition">
          <User variant="Bold" color="#00bc7d" size="22" />
        </Link>
        <Link
          to="/cart"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 transition">
          <Bag2 variant="Bold" color="#00bc7d" size="22" />
        </Link>
        <Link
          to="/search"
          className="flex items-center justify-center gap-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 px-3 py-2 transition text-emerald-400">
          <SearchNormal1 variant="Bold" color="#00bc7d" size="20" />
          <span className="text-sm">Search in Menu</span>
        </Link>
      </div>
    </nav>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // قفل کردن اسکرول و تار کردن پس‌زمینه هنگام باز بودن منو
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // بستن منو هنگام تغییر مسیر
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="rounded-2xl w-full mx-auto bg-neutral-800 flex flex-row items-center justify-between p-2 md:p-3 relative z-40">
      {/* Logo */}
      <Link to="/">
        <img
          alt="Logo Tarkhine"
          className="w-28 md:w-32 lg:w-40 cursor-pointer"
          src="/image/Logo.png"
        />
      </Link>

      {/* Menu toggle (mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 z-50">
        {isOpen ? (
          <CloseSquare variant="Linear" color="#00bc7d" />
        ) : (
          <HamburgerMenu variant="Linear" color="#00bc7d" />
        )}
      </button>

      {/* Blur overlay (برای تار شدن بک‌گراند) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-10"></div>
      )}

      {/* Menu */}
      <MenuBar isOpen={isOpen} />

      {/* Icons (desktop only) */}
      <div className="hidden md:flex flex-row-reverse gap-2 md:gap-3 lg:gap-4">
        <Link
          to="/profile"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <User variant="Bold" color="#00bc7d" size="22" />
        </Link>
        <Link
          to="/cart"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <Bag2 variant="Bold" color="#00bc7d" size="22" />
        </Link>
        <Link
          to="/menu"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <SearchNormal1 variant="Bold" color="#00bc7d" size="22" />
        </Link>
      </div>
    </header>
  );
}

export default Header;

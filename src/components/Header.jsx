import {
  Bag2,
  SearchNormal1,
  User,
  HamburgerMenu,
  CloseSquare,
} from "iconsax-reactjs";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext"; // استفاده از Context کارت

const menuItems = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Menu", href: "/menu" },
  { id: 3, label: "Representation", href: "/representation" },
  { id: 4, label: "About us", href: "/about" },
  { id: 5, label: "Contact us", href: "/contact" },
];

function CartIcon() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link
      to="/cart"
      className="relative rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 transition">
      <Bag2 variant="Bold" color="#ff7d5d" size="22" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

function MenuBar({ isOpen }) {
  const location = useLocation();

  return (
    <nav
      className={`${
        isOpen ? "flex" : "hidden"
      } md:flex flex-col md:flex-row items-start justify-center gap-4 md:gap-6
      absolute md:static top-16 left-0 w-full md:w-auto bg-base-300
      rounded-2xl md:bg-transparent p-4 md:p-0 z-30 transition-all`}>
      <ul className="text-secondary border-secondary flex flex-col md:flex-row items-left justify-center gap-3">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              className={`p-1 text-base md:text-sm lg:text-base transition-colors border-b-2 ${
                location.pathname === item.href
                  ? "border-secondary text-secondary"
                  : "border-transparent hover:border-secondary hover:text-secondary"
              }`}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* منوی آیکون‌ها در موبایل */}
      <div className="flex md:hidden flex-row justify-start gap-3 mt-4 w-full">
        <Link
          to="/profile"
          className="rounded-xl bg-neutral-700 hover:bg-neutral-600 p-2 transition">
          <User variant="Bold" color="#ff7d5d" size="22" />
        </Link>
        <CartIcon />
        <Link
          to="/search"
          className="flex items-center justify-center gap-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 px-3 py-2 transition">
          <SearchNormal1 variant="Bold" color="#ff7d5d" size="20" />
          <span className="text-sm text-[#ff7d5d] ">Search in Menu</span>
        </Link>
      </div>
    </nav>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className="rounded-2xl w-full mx-auto bg-base-300 flex flex-row items-center justify-between p-2 md:p-3 relative z-40 shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            alt="Logo Tarkhine"
            className="w-28 md:w-32 lg:w-40 cursor-pointer"
            src="/image/Logo.png"
          />
        </Link>
      </div>

      <MenuBar isOpen={isOpen} />

      {/* دکمه باز/بستن منوی موبایل */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-xl bg-neutral-700 hover:bg-neutral-600 z-50">
        {isOpen ? (
          <CloseSquare variant="Linear" color="#ff7d5d" />
        ) : (
          <HamburgerMenu variant="Linear" color="#ff7d5d" />
        )}
      </button>

      {/* بک‌دراپ هنگام باز بودن منو */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-10"></div>
      )}

      {/* آیکون‌ها در دسکتاپ */}
      <div className="hidden md:flex flex-row-reverse gap-2 md:gap-3 lg:gap-4">
        <Link
          to="/profile"
          className="rounded-xl bg-base-100 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <User variant="Bold" color="#ff7d5d" size="22" />
        </Link>
        <CartIcon />
        <Link
          to="/search"
          className="rounded-xl bg-base-100 hover:bg-neutral-600 p-2 md:p-2.5 lg:p-3 transition">
          <SearchNormal1 variant="Bold" color="#ff7d5d" size="22" />
        </Link>
      </div>
    </header>
  );
}

export default Header;

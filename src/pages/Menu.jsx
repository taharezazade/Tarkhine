import { Home2, MenuBoard } from "iconsax-react";
import { TickSquare } from "iconsax-reactjs";
import { Link } from "react-router-dom";
import MenuPageData from "../data/MenuPageData.json";
import FoodCard from "../components/FoodCard";

const Breadcrumbs = [
  {
    icon: (
      <Home2
        className="inline-block"
        color="#ff7d5d"
        variant="TwoTone"
        size="20"
      />
    ),
    label: "Home",
    to: "/",
  },
  {
    icon: (
      <MenuBoard
        className="inline-block"
        color="#ff7d5d"
        variant="TwoTone"
        size="20"
      />
    ),
    label: "Menu",
    to: "/menu",
  },
  {
    icon: (
      <TickSquare
        className="inline-block"
        color="#ff7d5d"
        variant="TwoTone"
        size="20"
      />
    ),
    label: "Select Menu Item",
  },
];

function Menu() {
  return (
    <div>
      <helmet>
        <title>Menu</title>
      </helmet>

      <nav className="mb-6">
        <h1 className="text-2xl py-2 font-bold">
          You can't eat here just once.
        </h1>
        <div className="breadcrumbs text-sm">
          <ul className="flex flex-wrap gap-2">
            {Breadcrumbs.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2">
                {item.icon}
                {item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="">
        {/* Grid container */}
        <div
          className="grid gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-3">
          {MenuPageData.map((item) => (
            <FoodCard key={item.id} food={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;

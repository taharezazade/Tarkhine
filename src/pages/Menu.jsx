import { useState } from "react";
import { FilterSquare, Home2, MenuBoard } from "iconsax-react";
import { Sort, TickSquare } from "iconsax-reactjs";
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

const categoryMap = {
  Burgers: "Appetizers",
  Pizza: "Main Course",
  Pasta: "Main Course",
  Salads: "Appetizers",
  Sandwiches: "Main Course",
  "Main Course": "Main Course",
  Seafood: "Main Course",
  Desserts: "Desserts",
  Drinks: "Drinks",
  Sides: "Appetizers",
};

function Menu() {
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("All");

  const sortedData = [...MenuPageData].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const filteredData =
    filterBy === "All"
      ? sortedData
      : sortedData.filter((item) => categoryMap[item.category] === filterBy);

  return (
    <div className="px-2">
      <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 my-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold py-2">
            You can't eat here just once.
          </h1>
          <div className="breadcrumbs text-sm mt-1">
            <ul className="flex flex-wrap gap-2">
              {Breadcrumbs.map((item) => (
                <li
                  key={item.label}
                  className="text-[#ff7d5d] inline-flex items-center gap-2">
                  {item.icon}
                  {item.to ? (
                    <Link to={item.to} className=" hover:underline font-medium">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="flex flex-col lg:flex-row items-start justify-between lg:w-fit gap-2">
          <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto">
            <span className="text-base sm:text-lg font-light">
              <Sort
                className="inline-block"
                color="#ff7d5d"
                size="24"
                variant="Bold"
              />
              &nbsp;Sort:
            </span>
            <select
              className="select select-secondary w-9/12 sm:w-1/2 md:w-40 lg:w-48 focus:outline-2 focus:outline-[#ff7d5d] border-[#ff7d5d] rounded-lg p-2 text-sm sm:text-base"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto">
            <span className="text-base sm:text-lg font-light">
              <FilterSquare
                className="inline-block"
                color="#ff7d5d"
                size="24"
                variant="Bold"
              />
              &nbsp; Filter:
            </span>
            <select
              className="select select-secondary w-9/12 sm:w-1/2 md:w-40 lg:w-48 focus:outline-2 focus:outline-[#ff7d5d] border-[#ff7d5d] rounded-lg p-2 text-sm sm:text-base"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}>
              <option value="All">All</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Main Course">Main Course</option>
            </select>
          </div>
        </section>
      </nav>

      <div
        className="grid gap-6 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3 
                    xl:grid-cols-4">
        {filteredData.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}

export default Menu;

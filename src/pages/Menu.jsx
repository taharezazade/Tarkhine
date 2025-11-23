import { useState, useEffect } from "react";
import { FilterSquare, Home2, MenuBoard } from "iconsax-react";
import { Sort, TickSquare } from "iconsax-reactjs";
import { Link } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import AOS from "aos";
import "aos/dist/aos.css"; // حتما CSS مربوطه import شود

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
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("All");

  // مقداردهی AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // مدت زمان انیمیشن
      easing: "ease-out-cubic",
      once: true, // فقط یکبار در لود شدن نمایش داده شود
    });
  }, []);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((json) => {
        const meals = json.meals.map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          category: meal.strCategory,
          description: meal.strInstructions
            ? meal.strInstructions.slice(0, 120) + "..."
            : "Delicious meal made with selected ingredients. Enjoy the taste!",
          rating: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 200) + 100,
        }));

        setData(meals);
      });
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const filteredData =
    filterBy === "All"
      ? sortedData
      : sortedData.filter((item) => item.category === filterBy);

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
                    <Link to={item.to} className="hover:underline font-medium">
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

        {/* Sort + Filter */}
        <section className="flex flex-col lg:flex-row items-start justify-between lg:w-fit gap-2">
          {/* Sort */}
          <div className="flex items-center justify-between gap-2 w-full md:w-auto">
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
              className="select w-40 border-[#ff7d5d] rounded-lg p-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Filter */}
          <div className="flex items-center justify-between gap-2 w-full md:w-auto">
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
              className="select w-40 border-[#ff7d5d] rounded-lg p-2"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}>
              <option value="All">All</option>
              <option value="Beef">Beef</option>
              <option value="Chicken">Chicken</option>
              <option value="Dessert">Dessert</option>
              <option value="Seafood">Seafood</option>
              <option value="Vegetarian">Vegetarian</option>
            </select>
          </div>
        </section>
      </nav>

      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData.map((food) => (
          <div key={food.id} data-aos="fade-up">
            <FoodCard food={food} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;

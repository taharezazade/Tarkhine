import { useParams, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { Card } from "iconsax-react";
import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";
import { useFavorite } from "../Context/FavoriteContext";
import toast, { Toaster } from "react-hot-toast";
import { HeartAdd, Home2, MenuBoard, TickSquare } from "iconsax-reactjs";

function FoodDetail() {
  const { foodName } = useParams();
  const { addToCart, cartItems } = useCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorite, isFavorite, removeFromFavorite } = useFavorite();
  const formattedName = decodeURIComponent(foodName.replace(/-/g, " "));

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchFood = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${formattedName}`,
          { signal }
        );
        if (!res.ok) throw new Error("Failed to fetch meal data.");
        const json = await res.json();

        if (!json.meals || json.meals.length === 0) {
          setFood(null);
          toast.error("Food not found.", { position: "top-center" });
          return;
        }

        const meal = json.meals[0];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ing = meal[`strIngredient${i}`];
          if (ing) ingredients.push(ing);
        }

        const mealData = {
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          description:
            meal.strInstructions?.slice(0, 300) + "..." ||
            "This meal has no description available.",
          category: meal.strCategory,
          rating: Math.floor(Math.random() * 5) + 1,
          price: Math.floor(Math.random() * 200) + 100,
          ingredients,
        };

        setFood(mealData);
      } catch (err) {
        setFood(null);
        toast.error(err.message || "An unexpected error occurred.", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
    return () => controller.abort();
  }, [formattedName]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xl font-semibold text-white/70">
        <span className="loading loading-ring loading-sm mr-2"></span>
        Loading...
      </div>
    );
  }

  if (!food) {
    return (
      <div className="px-6 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#ff7d5d]">
          Food Not Found
        </h1>
        <p className="text-white/70 mb-4">
          Sorry, we couldn't find the food you were looking for. Please check
          the name or try another item.
        </p>
        <Link to="/menu" className="btn btn-ghost">
          Back to Menu
        </Link>
      </div>
    );
  }

  const isInCart = cartItems.some((item) => item.id === food.id);
  const favoriteStatus = isFavorite(food.id);

  const handleAddToFavorite = () => {
    if (!food) return;

    if (favoriteStatus) {
      removeFromFavorite(food.id);
      toast.success(`${food.name} removed from favorites.`, {
        position: "top-center",
      });
    } else {
      if (addToFavorite(food)) {
        toast.success(`${food.name} added to favorites!`, {
          position: "top-center",
        });
      } else {
        toast.error(`${food.name} is already in favorites.`, {
          position: "top-center",
        });
      }
    }
  };

  const handleAddToCart = () => {
    try {
      addToCart(food);
      toast.success(`${food.name} has been added to your cart.`, {
        position: "top-center",
      });
    } catch {
      toast.error("Failed to add item to cart.", { position: "top-center" });
    }
  };

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
      label: food.name,
    },
  ];

  return (
    <div className="sm:px-10 md:px-10 py-4">
      <Toaster />
      <div className="breadcrumbs text-sm">
        <ul className="flex flex-wrap gap-2">
          {Breadcrumbs.map((item) => (
            <li
              key={item.label}
              className="text-[#ff7d5d] inline-flex items-center gap-2"
            >
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

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-86 lg:w-1/3 rounded-xl shadow-lg object-cover"
        />

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-[#ff7d5d]">{food.name}</h1>
          <p className="text-white/60">{food.description}</p>
          <p className="font-semibold">Category: {food.category}</p>
          <p className="font-semibold">Price: ${food.price.toFixed(2)}</p>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(food.rating)
                    ? "text-yellow-400"
                    : "text-white/40"
                }
              >
                ★
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {food.ingredients.map((ing, idx) => (
              <span key={idx} className="badge badge-outline cursor-pointer">
                {ing}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              className={`btn ${
                isInCart ? "btn-disabled" : "btn-success"
              } w-full lg:w-44`}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              <Card
                className="inline-block mr-2"
                color="#252525"
                size="24"
                variant="Bold"
              />
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              className={`btn w-full lg:w-44 ${
                favoriteStatus ? "btn-success" : "btn-error btn-soft"
              }`}
              onClick={handleAddToFavorite}
            >
              <HeartAdd
                variant={favoriteStatus ? "Bold" : "Outline"}
                className="inline-block mr-1"
                size={20}
                fill={favoriteStatus ? "currentColor" : "none"}
              />
              {favoriteStatus ? "Remove Favorite" : "Add to Favorites"}
            </button>
          </div>

          <Link
            to="/menu"
            className="inline-block font-light w-fit text-white p-2 rounded-lg btn btn-ghost transition mt-2"
          >
            <LuArrowLeft className="inline-block mr-1" size={20} />
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;

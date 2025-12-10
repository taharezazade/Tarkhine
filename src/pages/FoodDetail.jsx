import { useParams, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { Card } from "iconsax-react";
import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";

function FoodDetail() {
  const { foodName } = useParams();
  const { addToCart, cartItems } = useCart();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const formattedName = decodeURIComponent(foodName.replace(/-/g, " "));

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${formattedName}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json.meals || json.meals.length === 0) {
          setFood(null);
          setLoading(false);
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
        setLoading(false);
      });
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
        <Link to="/menu" className="btn btn-ghost">
          Back to Menu
        </Link>
      </div>
    );
  }

  const isInCart = cartItems.some((item) => item.id === food.id);

  return (
    <div className="sm:px-10 md:px-10 py-4">
      <div className="flex flex-col lg:flex-row gap-6">
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

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(food.rating)
                    ? "text-yellow-400"
                    : "text-white/40"
                }>
                ★
              </span>
            ))}
          </div>

          {/* Ingredients */}
          <div className="flex flex-wrap gap-2 mt-2">
            {food.ingredients.map((ing, idx) => (
              <span key={idx} className="badge badge-outline cursor-pointer">
                {ing}
              </span>
            ))}
          </div>

          {/* Add to Cart */}
          <button
            className={`btn mt-4 ${
              isInCart ? "btn-disabled" : "btn-success"
            } w-full lg:w-56`}
            onClick={() => addToCart(food)}
            disabled={isInCart}>
            <Card
              className="inline-block mr-2"
              color="#252525"
              size="24"
              variant="Bold"
            />
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </button>

          <Link
            to="/menu"
            className="inline-block font-light w-fit text-white p-2 rounded-lg btn btn-ghost transition mt-2">
            <LuArrowLeft className="inline-block mr-1" size={20} />
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;

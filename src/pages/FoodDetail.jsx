import { useParams, Link } from "react-router-dom";
import MenuPageData from "../data/MenuPageData.json";
import { Card } from "iconsax-react";
import { LuArrowLeft } from "react-icons/lu";
import { useCart } from "../Context/CartContext";

function FoodDetail() {
  const { foodName } = useParams();
  const { addToCart, cartItems } = useCart();

  const formattedName = decodeURIComponent(foodName.replace(/-/g, " "));
  const food = MenuPageData.find(
    (item) => item.name.toLowerCase() === formattedName.toLowerCase()
  );
  const isInCart = cartItems.some((item) => item.id === food?.id);

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

  return (
    <div className="px-4 sm:px-10 md:px-20 py-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={food.image}
          alt={food.name}
          className="w-full lg:w-1/2 rounded-xl shadow-lg object-cover"
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
                }>
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

          <button
            className={`btn mt-4 ${
              isInCart ? "btn-disabled" : "btn-success"
            } w-full`}
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

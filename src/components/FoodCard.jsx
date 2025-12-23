import { Star1 } from "iconsax-react";
import { Link } from "react-router-dom";

export default function FoodCard({ food }) {
  return (
    <Link
      to={`/menu/${encodeURIComponent(food.name.replace(/\s+/g, "-"))}`}
      className="bg-base-300 rounded-2xl shadow-lg p-2 flex flex-col items-start justify-between transition hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Image */}

      <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover object-center filter grayscale hover:grayscale-0 transition duration-500 ease-in-out"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-lg font-semibold text-secondary">{food.name}</h3>

        <p className="text-gray-400 text-sm line-clamp-2">{food.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-secondary-content bg-secondary py-1 px-3 rounded-lg text-sm font-medium">
            ${food.price}
          </span>

          <div className="flex items-center gap-1 text-yellow-400">
            <Star1 size="18" variant="Bold" />
            <span className="text-sm text-gray-300">{food.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

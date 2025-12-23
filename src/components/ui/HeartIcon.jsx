import { HeartAdd } from "iconsax-reactjs";
import { useFavorite } from "../../Context/FavoriteContext";

export default function HeartIcon({ food, size = 20, className = "" }) {
  const { isFavorite, addToFavorite, removeFromFavorite } = useFavorite();

  const isFav = isFavorite(food?.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFav) {
      removeFromFavorite(food.id);
    } else {
      addToFavorite(food);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-circle btn-ghost btn-sm ${className}`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartAdd
        variant={isFav ? "Bold" : "Outline"}
        size={size}
        className={isFav ? "text-error" : "text-white/70"}
      />
    </button>
  );
}

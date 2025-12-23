import { useFavorite } from "../../Context/FavoriteContext";
import { Eye, Heart } from "iconsax-reactjs";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Favorite() {
  const { favorites } = useFavorite();

  if (!favorites) {
    toast.error("Failed to load favorite items.", {
      position: "top-center",
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
    });
    return (
      <div className="p-4 text-center text-red-500">
        <Toaster />
        Failed to load favorite items.
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-3 md:px-5 py-4">
      <Toaster />
      <h2 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
        Favorite
      </h2>

      {favorites.length === 0 ? (
        <>
          {toast("Your favorite list is empty.", {
            position: "top-center",
            style: {
              borderRadius: "12px",
              padding: "16px",
              background: "#333",
              color: "#fff",
            },
          })}
          <div className="text-center py-16">
            <Heart
              size={80}
              className="mx-auto mb-6 text-white/30"
              variant="Outline"
            />
            <p className="text-white/70 text-xl sm:text-2xl font-light">
              Your favorite list is empty
            </p>
            <Link
              to="/menu"
              className="mt-6 inline-block bg-[#ff7d5d] hover:bg-[#ff5a3d] text-white py-2 px-6 rounded-lg font-semibold transition"
            >
              Browse Menu
            </Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-base-300 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <p className="text-secondary font-bold text-lg">{item.name}</p>
                <p className="text-white/70 text-sm">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <Link
                to={`/food/${
                  item.slug || item.name.toLowerCase().replace(/\s+/g, "-")
                }`}
                className="flex items-center justify-center gap-2 bg-[#ff7d5d] hover:bg-[#ff5a3d] text-white py-2 text-sm font-semibold transition"
              >
                <Eye size={20} variant="Bulk" />
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

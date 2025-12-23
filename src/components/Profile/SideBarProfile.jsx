import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../Context/FavoriteContext";
import { useOrders } from "../../Context/OrderContext";
import {
  User,
  SmsTracking,
  Heart,
  Location,
  LogoutCurve,
} from "iconsax-reactjs";
import { DefaultProfileAvatar } from "../Utils/DefaultProfileAvatar";

export default function SideBarProfile({ activeTab, setActiveTab }) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { favorites } = useFavorite();
  const { orders } = useOrders();

  const menu = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    {
      id: "orders",
      label: "Order Tracking",
      icon: <SmsTracking size={20} />,
      badge: orders.length > 0 ? orders.length : null,
    },

    {
      id: "favorite",
      label: "Favorite",
      icon: <Heart size={20} />,
      badge: favorites.length > 0 ? favorites.length : null,
    },
    { id: "addresses", label: "My Addresses", icon: <Location size={20} /> },
    { id: "logout", label: "Log Out", icon: <LogoutCurve size={20} /> },
  ];

  const handleClick = (id) => {
    if (id === "logout") {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
      return;
    }
    setActiveTab(id);
  };

  if (!user) return null;

  return (
    <div className="bg-base-300 w-full p-4 rounded-2xl">
      <div className="flex gap-3 mb-4">
        <img
          src={user.avatar || DefaultProfileAvatar()}
          className="w-16 h-16 rounded-xl object-cover"
          alt="Profile"
          onError={(e) => {
            e.target.src = DefaultProfileAvatar();
          }}
        />
        <div>
          <p className="text-secondary font-semibold">{user.name}</p>
          <p className="text-white/50 text-sm">{user.phoneNumber}</p>
        </div>
      </div>

      <ul className="flex gap-1 flex-col">
        {menu.map((m) => (
          <li
            key={m.id}
            onClick={() => handleClick(m.id)}
            className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${
              activeTab === m.id
                ? "text-secondary bg-neutral-700"
                : "text-white hover:bg-neutral-700"
            }`}
          >
            <div className="flex gap-2 items-center">
              {m.icon}
              {m.label}
            </div>
            {m.badge && (
              <span className="badge badge-secondary badge-sm">{m.badge}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

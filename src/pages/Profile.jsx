import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../Utils/ToastProvider";
import {
  Bag,
  Calendar2,
  Call,
  DirectInbox,
  Grammerly,
  Heart,
  Location,
  LogoutCurve,
  SmsTracking,
  User,
} from "iconsax-reactjs";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function ProfileContent({ user }) {
  const { setUserAndPersist } = useUser();

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    fullName: "",
    birthday: "",
    avatar: "",
  });

  const [originalForm, setOriginalForm] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (user) {
      const data = {
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        fullName: user.fullName || "",
        birthday: user.birthday || "",
        avatar: user.avatar || "",
      };

      setForm(data);
      setOriginalForm(data);
      setIsLocked(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsLocked(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      showErrorToast("Image size must be less than 1MB");
      return;
    }

    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, avatar: base64 }));
    setIsLocked(false);
  };

  const validate = () => {
    if (!form.name.trim()) return "Display name is required";
    if (form.email && !form.email.includes("@")) return "Invalid email format";
    return null;
  };

  const isChanged = JSON.stringify(form) !== JSON.stringify(originalForm);

  const handleSave = () => {
    const error = validate();
    if (error) {
      showErrorToast(error);
      return;
    }

    const updatedUser = {
      ...user,
      ...form,
      updatedAt: new Date().toISOString(),
    };

    setUserAndPersist(updatedUser);
    setOriginalForm(form);
    setIsLocked(true);

    showSuccessToast("Profile updated successfully");
  };

  return (
    <div>
      <h2 className="text-5xl font-bold text-secondary mb-6">Profile</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="label">Display name</label>
          <label className="input bg-base-300">
            <Grammerly size={22} color="#ff7d5d" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={isLocked}
            />
          </label>
        </div>

        <div>
          <label className="label">Phone Number</label>
          <label className="input bg-base-300">
            <Call size={22} color="#ff7d5d" />
            <input value={form.phoneNumber} disabled />
          </label>
        </div>

        <div>
          <label className="label">Email</label>
          <label className="input bg-base-300">
            <DirectInbox size={22} color="#ff7d5d" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={isLocked}
            />
          </label>
        </div>

        <div>
          <label className="label">Profile image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="file-input file-input-secondary"
          />
        </div>

        <div>
          <label className="label">Name and surname</label>
          <label className="input bg-base-300">
            <User size={22} color="#ff7d5d" />
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label className="label">
            Birthday <small>(Optional)</small>
          </label>
          <label className="input bg-base-300">
            <Calendar2 size={22} color="#ff7d5d" />
            <input
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={handleChange}
              disabled={isLocked}
            />
          </label>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          className="btn btn-secondary"
          disabled={!isChanged || isLocked}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
function OrderTracking() {
  return (
    <div>
      <h2 className="text-5xl font-bold text-secondary mb-4">Order's</h2>
      <div className="flex items-center justify-center flex-col">
        <p className="text-white/50 text-2xl font-light">
          You have not placed any orders yet!
        </p>
        <button className="btn btn-wide btn-secondary btn-soft mt-4">
          <Bag size={22} variant="Bulk" />
          Start Shopping
        </button>
      </div>
    </div>
  );
}

function Favorite() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Favorite</h2>
      <p>Your favorite items will appear here.</p>
    </div>
  );
}

function MyAddress() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">My Addresses</h2>
      <p>Your saved addresses will appear here.</p>
    </div>
  );
}

function DefaultProfileAvatar() {
  return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
}

function SideBarProfile({ activeTab, setActiveTab }) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const menu = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "orders", label: "Order Tracking", icon: <SmsTracking size={20} /> },
    { id: "favorite", label: "Favorite", icon: <Heart size={20} /> },
    { id: "addresses", label: "My Addresses", icon: <Location size={20} /> },
    { id: "logout", label: "Log Out", icon: <LogoutCurve size={20} /> },
  ];

  const handleClick = (id) => {
    if (id === "logout") {
      setUser(null);
      navigate("/");
      return;
    }
    setActiveTab(id);
  };

  if (!user) return null;

  return (
    <div className="bg-base-300 w-3/12 p-4 rounded-2xl">
      <div className="flex gap-3 mb-4">
        <img
          src={user.avatar || DefaultProfileAvatar()}
          className="w-16 h-16 rounded-xl object-cover"
          alt="Profile"
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
            className={`flex gap-2 p-2 rounded-md cursor-pointer ${
              activeTab === m.id
                ? "text-secondary bg-neutral-700"
                : "text-white hover:bg-neutral-700"
            }`}
          >
            {m.icon}
            {m.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useUser();

  if (!user) {
    return (
      <p className="p-4 text-red-500">
        You must be logged in to view this page.
      </p>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent user={user} />;
      case "orders":
        return <OrderTracking />;
      case "favorite":
        return <Favorite />;
      case "addresses":
        return <MyAddress />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row gap-8 justify-start items-start mt-4">
      <SideBarProfile activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4 w-9/12 bg-base-200 rounded-2xl">
        {renderContent()}
      </div>
    </div>
  );
}

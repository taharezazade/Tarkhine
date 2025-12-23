import { useState } from "react";
import { useUser } from "../Context/UserContext";
import {
  ProfileContent,
  OrderTracking,
  Favorite,
  MyAddress,
  SideBarProfile,
} from "../components/Profile";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useUser();

  if (!user) {
    toast.error("You must be logged in to view this page.", {
      position: "top-center",
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
    });

    return (
      <div className="p-4 text-center">
        <Toaster />
        <p className="text-red-500">You must be logged in to view this page.</p>
      </div>
    );
  }

  const renderContent = () => {
    try {
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
    } catch (err) {
      toast.error("Failed to load profile content.", {
        position: "top-center",
        style: {
          borderRadius: "12px",
          padding: "16px",
          background: "#333",
          color: "#fff",
        },
      });
      return <p className="text-red-500">Failed to load profile content.</p>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-4 px-4 sm:px-6">
      <Toaster />
      {/* Sidebar */}
      <div className="w-64 lg:w-3/12">
        <SideBarProfile activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content */}
      <div className="w-full lg:w-9/12 bg-base-200 rounded-2xl p-4 sm:p-6">
        {renderContent()}
      </div>
    </div>
  );
}

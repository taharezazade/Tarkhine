import { useState, useEffect } from "react";
import { useUser } from "../../Context/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { fileToBase64 } from "../Utils/DefaultProfileAvatar";
import { Grammerly, Call, DirectInbox, User, Calendar2 } from "iconsax-reactjs";

export default function ProfileContent({ user }) {
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

  const notifySuccess = (msg) => toast.success(msg, { position: "top-center" });
  const notifyError = (msg) => toast.error(msg, { position: "top-center" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setIsLocked(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      notifyError("Image size must be less than 1MB");
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
      notifyError(error);
      return;
    }
    const updatedUser = {
      ...user,
      ...form,
      updatedAt: new Date().toISOString(),
    };
    try {
      setUserAndPersist(updatedUser);
      setOriginalForm(form);
      setIsLocked(true);
      notifySuccess("Profile updated successfully");
    } catch {
      notifyError("Failed to update profile");
    }
  };

  return (
    <div className="px-2 sm:px-3 md:px-5 py-4">
      <Toaster />
      <h2 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
        Profile
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display Name */}
        <div>
          <label className="label">Display name</label>
          <label className="input bg-base-300 flex items-center gap-2">
            <Grammerly size={22} color="#ff7d5d" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full"
            />
          </label>
        </div>

        {/* Phone Number */}
        <div>
          <label className="label">Phone Number</label>
          <label className="input bg-base-300 flex items-center gap-2">
            <Call size={22} color="#ff7d5d" />
            <input value={form.phoneNumber} disabled className="w-full" />
          </label>
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <label className="input bg-base-300 flex items-center gap-2">
            <DirectInbox size={22} color="#ff7d5d" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full"
            />
          </label>
        </div>

        {/* Avatar */}
        <div className="sm:col-span-1 lg:col-span-3">
          <label className="label">Profile image</label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="file-input file-input-secondary"
              disabled={isLocked}
            />
            {form.avatar && (
              <img
                src={form.avatar}
                alt="Preview"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
              />
            )}
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="label">Name and surname</label>
          <label className="input bg-base-300 flex items-center gap-2">
            <User size={22} color="#ff7d5d" />
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full"
            />
          </label>
        </div>

        {/* Birthday */}
        <div>
          <label className="label">
            Birthday <small>(Optional)</small>
          </label>
          <label className="input bg-base-300 flex items-center gap-2">
            <Calendar2 size={22} color="#ff7d5d" />
            <input
              name="birthday"
              type="date"
              value={form.birthday}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full"
            />
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleSave}
          className="btn btn-secondary flex-1"
          disabled={!isChanged || isLocked}
        >
          Save changes
        </button>
        <button
          onClick={() => {
            setForm(originalForm);
            setIsLocked(false);
          }}
          className="btn btn-outline flex-1"
          disabled={!isChanged || isLocked}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

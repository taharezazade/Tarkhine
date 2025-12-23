import { useState, useEffect } from "react";
import { useUser } from "../../Context/UserContext";
import { Trash, Edit2, Add } from "iconsax-reactjs";
import toast, { Toaster } from "react-hot-toast";

export default function MyAddress() {
  const { user, setUserAndPersist } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    label: "",
    street: "",
    city: "",
    postalCode: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (user?.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
    });

  const notifyError = (msg) =>
    toast.error(msg, {
      position: "top-center",
      style: {
        borderRadius: "12px",
        padding: "16px",
        background: "#333",
        color: "#fff",
      },
    });

  const handleSave = () => {
    if (!form.label.trim() || !form.street.trim() || !form.city.trim()) {
      notifyError("Please fill all required fields");
      return;
    }

    let updatedAddresses;
    if (editingIndex !== null) {
      updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = form;
      notifySuccess("Address updated");
    } else {
      updatedAddresses = [...addresses, form];
      notifySuccess("Address added");
    }

    setAddresses(updatedAddresses);
    setUserAndPersist({ ...user, addresses: updatedAddresses });

    setForm({ label: "", street: "", city: "", postalCode: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setForm(addresses[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    setUserAndPersist({ ...user, addresses: updatedAddresses });
    notifySuccess("Address removed");
  };

  return (
    <div className="px-2 sm:px-3 md:px-5 py-4">
      <Toaster />
      <h2 className="text-4xl sm:text-5xl font-bold text-secondary mb-6">
        My Addresses
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {addresses.length === 0 ? (
          <p className="text-white/70 col-span-full">
            You have no saved addresses. Add one below.
          </p>
        ) : (
          addresses.map((addr, i) => (
            <div
              key={i}
              className="bg-base-300 p-4 rounded-xl shadow-md flex flex-col gap-2"
            >
              <p className="font-semibold text-white">{addr.label}</p>
              <p className="text-white/70 text-sm">{addr.street}</p>
              <p className="text-white/70 text-sm">{addr.city}</p>
              {addr.postalCode && (
                <p className="text-white/50 text-xs">{addr.postalCode}</p>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(i)}
                  className="btn btn-sm btn-secondary btn-soft flex-1 gap-1"
                >
                  <Edit2 size={18} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="btn btn-sm btn-error btn-soft flex-1 gap-1"
                >
                  <Trash size={18} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Form */}
      <div className="rounded-xl max-w-2xl">
        <h3 className="text-xl font-semibold text-secondary mb-4">
          {editingIndex !== null ? "Edit Address" : "Add New Address"}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="label"
            placeholder="Label (e.g., Home, Office)"
            value={form.label}
            onChange={handleChange}
            className="input input-secondary w-full bg-base-200"
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleChange}
            className="input input-secondary w-full bg-base-200"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="input input-secondary w-full bg-base-200"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code (Optional)"
            value={form.postalCode}
            onChange={handleChange}
            className="input input-secondary w-full bg-base-200"
          />
        </div>
        <button
          onClick={handleSave}
          className="btn btn-secondary btn-wide mt-4 flex items-center justify-center gap-2"
        >
          <Add size={20} />
          {editingIndex !== null ? "Update Address" : "Add Address"}
        </button>
      </div>
    </div>
  );
}

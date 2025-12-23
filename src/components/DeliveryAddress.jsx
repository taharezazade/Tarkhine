import { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { AddCircle } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function DeliveryAddress() {
  const { user } = useUser();
  const navigate = useNavigate();
  const addresses = user?.addresses || [];

  const [address, setAddress] = useState("");
  const hasMultipleAddress = addresses.length > 1;

  useEffect(() => {
    if (!addresses.length) return;

    const lastUsed = [...addresses].sort(
      (a, b) => new Date(b.lastUsedAt) - new Date(a.lastUsedAt)
    )[0];

    const defaultAddress = addresses.find((a) => a.isDefault);

    setAddress(lastUsed?.fullAddress || defaultAddress?.fullAddress);
  }, [addresses]);

  const handleAddAddressClick = () => {
    navigate("/profilePage");
    toast.success("You can add a new address now!", { position: "top-center" });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    toast.success("Delivery address updated!", { position: "top-center" });
  };

  return (
    <fieldset className="fieldset flex flex-col gap-3">
      <Toaster />
      {hasMultipleAddress && (
        <div className="flex gap-2 items-center">
          <select
            className="select select-bordered w-full bg-base-200"
            value={address}
            onChange={handleAddressChange}
          >
            {addresses.map((addr) => (
              <option key={addr.id} value={addr.fullAddress}>
                {addr.isDefault && "⭐ "}
                {addr.title} — {addr.city}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddAddressClick}
            className="btn btn-outline btn-primary flex gap-1"
          >
            <AddCircle size={20} />
            Add
          </button>
        </div>
      )}

      <textarea
        placeholder="Delivery Address"
        className="textarea textarea-bordered w-full bg-base-200"
        rows={4}
        value={address}
        onChange={handleAddressChange}
        required
      />

      {!addresses.length && (
        <button
          type="button"
          onClick={handleAddAddressClick}
          className="btn btn-outline btn-primary w-fit"
        >
          <AddCircle size={20} />
          Add new address
        </button>
      )}
    </fieldset>
  );
}

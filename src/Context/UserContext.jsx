// UserContext.jsx
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const UserContext = createContext(null);
const USER_KEY = "app:user";

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : { addresses: [] };
    } catch (e) {
      toast.error("Failed to load user from localStorage.");
      return { addresses: [] };
    }
  });

  const persist = (u) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch (e) {
      toast.error("Failed to save user data.");
    }
  };

  const setUserAndPersist = (next) => {
    setUser((prev) => {
      const merged =
        typeof next === "function" ? next(prev) : { ...prev, ...next };
      if (!Array.isArray(merged.addresses)) merged.addresses = [];
      persist(merged);
      toast.success("User data updated.");
      return merged;
    });
  };

  const clearUser = () => {
    setUser({ addresses: [] });
    try {
      localStorage.removeItem(USER_KEY);
      toast.success("User data cleared.");
    } catch (e) {
      toast.error("Failed to clear user data.");
    }
  };

  // Helper functions for addresses
  const addAddress = (address) => {
    setUserAndPersist((prev) => {
      const updated = [...(prev.addresses || []), address];
      toast.success("Address added.");
      return { ...prev, addresses: updated };
    });
  };

  const updateAddress = (index, address) => {
    setUserAndPersist((prev) => {
      const updated = [...(prev.addresses || [])];
      if (updated[index]) {
        updated[index] = address;
        toast.success("Address updated.");
      } else {
        toast.error("Address not found.");
      }
      return { ...prev, addresses: updated };
    });
  };

  const removeAddress = (index) => {
    setUserAndPersist((prev) => {
      const updated = [...(prev.addresses || [])];
      if (updated[index]) {
        updated.splice(index, 1);
        toast.success("Address removed.");
      } else {
        toast.error("Address not found.");
      }
      return { ...prev, addresses: updated };
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setUserAndPersist,
        clearUser,
        addAddress,
        updateAddress,
        removeAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

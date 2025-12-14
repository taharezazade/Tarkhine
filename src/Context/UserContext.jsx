import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("current_user")) || null;
  });

  const setUserAndPersist = (user) => {
    setUser(user);
    localStorage.setItem("current_user", JSON.stringify(user));
  };

  useEffect(() => {
    if (user) localStorage.setItem("current_user", JSON.stringify(user));
    else localStorage.removeItem("current_user");
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, setUserAndPersist }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}

import React, { useState, useEffect, createContext } from "react";
import { auth } from "../Services/Firebase";
export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { displayName, email, photoURL, uid } = user;
          await setUser({
            displayName,
            email,
            photoURL,
            uid,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [dispatch]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;

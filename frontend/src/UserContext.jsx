import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";

const backendURL = import.meta.env.VITE_TEMPLATE_BACKEND_URL;

const socket = io(backendURL, {
  autoConnect: false,
});

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  socket.on("connect", () => {
    console.log("Connected to socket.io", socket.id);
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserState = () => {
  const authContext = useContext(UserContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

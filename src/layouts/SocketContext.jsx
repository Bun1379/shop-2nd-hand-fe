import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const SocketContext = createContext();

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export const SocketProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  useEffect(() => {
    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      setUser(updatedUser);
    };

    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);
  useEffect(() => {
    if (user) {
      socket.emit("register", user._id);
    }
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    const handleNotification = (data) => {
      toast.info(data.message);
    };

    socket.on("connect", handleConnect);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, user, setUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export const setUserInLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  const event = new Event("userUpdated");
  window.dispatchEvent(event);
};

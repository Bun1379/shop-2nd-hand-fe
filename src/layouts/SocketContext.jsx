import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const SocketContext = createContext();

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  autoConnect: true,
});

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;

    if (userId) {
      socket.emit("register", userId);
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
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

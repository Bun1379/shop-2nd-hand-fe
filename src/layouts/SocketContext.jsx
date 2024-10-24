import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id); // Log khi kết nối thành công
    });

    socket.on("notification", (data) => {
      toast.info(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

import { joinRoom, leaveRoom } from "./room.js";
import { io } from "./socket.js";

export const handleEvents = (socket) => {
  socket.on("joinConversation", (conversationId) => {
    joinRoom(socket, conversationId);
    io.to(conversationId).emit(
      "onlineUsersNumberForGroupChats",
      io?.sockets?.adapter?.rooms?.get(conversationId)?.size
    );
  });
  socket.on("leaveConversation", (conversationId) => {
    leaveRoom(socket, conversationId);
    io.to(conversationId).emit(
      "onlineUsersNumberForGroupChats",
      io?.sockets?.adapter?.rooms?.get(conversationId)?.size
    );
  });
  socket.on("connectedUser", (userId) => {
    console.log("connectedUser");
    joinRoom(socket, userId);
  });
  socket.on("disconnectedUser", (userId) => {
    console.log("disconnectedUser");
    leaveRoom(socket, userId);
  });
};

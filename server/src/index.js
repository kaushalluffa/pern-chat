import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  PORT,
  COMPLETE_URL,
  CLIENT_URL,
  NODE_ENV,
  IMAGE_KIT_URL_ENDPOINT,
  IMAGE_KIT_PUBLIC_KEY,
  IMAGE_KIT_PRIVATE_KEY,
} from "./constants.js";
import bodyParser from "body-parser";
import conversationRouter from "./controllers/conversationControllers.js";
import messageRouter from "./controllers/messageController.js";
import ioMiddleware from "./middleware/ioMiddleware.js";
import { app, io, server } from "./socket/socket.js";
import { handleEvents } from "./socket/events.js";
import usersController from "./controllers/usersControllers.js";
import authController from "./controllers/authController.js";
import authMiddleware from "./middleware/authMiddleware.js";
import imageKitAuthController from "./controllers/imageKitAuthController.js";
import path from "path";
import express from "express";
import ImageKit from "imagekit";
dotenv.config();
const __dirname = path.resolve();
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());

export const imagekit = new ImageKit({
  urlEndpoint: IMAGE_KIT_URL_ENDPOINT,
  publicKey: IMAGE_KIT_PUBLIC_KEY,
  privateKey: IMAGE_KIT_PRIVATE_KEY,
});
// io middleware auth
io.use(ioMiddleware).on("connection", (socket) => {
  handleEvents(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use("/auth", authController);
//protected routes
app.use("/users", authMiddleware, usersController);
app.use("/conversation", authMiddleware, conversationRouter);
app.use("/message", authMiddleware, messageRouter);
app.use("/img-kit", imageKitAuthController);
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(
      path.resolve(__dirname,  "client", "dist", "index.html")
    );
  });
}
server.listen(PORT, () => {
  console.log(`server running at ${COMPLETE_URL}`);
});

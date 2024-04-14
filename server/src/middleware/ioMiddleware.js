import { JWT_SECRET_KEY } from "../constants.js";
import jwt from "jsonwebtoken";
export default async function ioMiddleware(socket, next) {
  const token = socket.handshake.auth.token ?? "";
  let verifiedToken;
  try {
    verifiedToken = await jwt.verify(token, JWT_SECRET_KEY);

    if (!verifiedToken) {
      const err = new Error("Token expired");
      next(err);
    }
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
}

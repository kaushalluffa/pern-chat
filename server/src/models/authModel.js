import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { CLIENT_AUTH_URL, JWT_SECRET_KEY, NODE_ENV } from "../constants.js";
export const signup = async (req, res) => {
  const { email, password, name, imageUrl = null } = req?.body;
  if (!email) {
    return res.json({ message: "Email is required" });
  }
  if (!password) {
    return res.json({ message: "Password is required" });
  }
  if (!name) {
    return res.json({ message: "Name is required" });
  }
  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
      return res.json({ message: "Email is already in use" });
    }
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { email, name, imageUrl, password: hashedPassword },
      });

      res.cookie("token", await generateToken(newUser), {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: NODE_ENV !== "dev",
        sameSite: "strict",
      });
      return res.json({
        message: "Signed up successfully",
        user: {
          email: newUser?.email,
          id: newUser?.id,
          name: newUser?.name,
          imageUrl: newUser?.imageUrl,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error?.toString() });
  }
};
export const login = async (req, res) => {
  const { email, password } = req?.body;
  if (!email) {
    return res.json({ message: "Email is required" });
  }
  if (!password) {
    return res.json({ message: "Password is required" });
  }

  try {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (!existingUser) {
      return res.json({ message: "Couldn't find the user" });
    }
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser?.password
      );
      if (!isPasswordValid) {
        return res.json({ message: "Invalid password" });
      }

      res.cookie("token", await generateToken(existingUser), {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: NODE_ENV !== "dev",
        sameSite: "strict",
      });
      return res.json({
        message: "Logged in successfully",
        user: {
          email: existingUser?.email,
          id: existingUser?.id,
          name: existingUser?.name,
          imageUrl: existingUser?.imageUrl,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error?.toString() });
  }
};
export const verifyUser = async (req, res) => {
  const cookies = req?.cookies;
  if (cookies?.token) {
    const decodedToken = jwt.verify(cookies.token, JWT_SECRET_KEY);
    if (!decodedToken) {
      return res.redirect(CLIENT_AUTH_URL);
    }
    try {
      const existingUser = await prisma.user.findFirst({
        where: { email: decodedToken?.email },
      });
      if (!existingUser) {
        return res.redirect(CLIENT_AUTH_URL);
      }
      return res.json({
        isAuthenticated: true,
        user: {
          email: existingUser?.email,
          id: existingUser?.id,
          name: existingUser?.name,
          imageUrl: existingUser?.imageUrl,
        },
      });
    } catch (error) {
      console.log(error);
      return res.redirect(CLIENT_AUTH_URL);
    }
  }
};

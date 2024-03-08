require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions {
  expiresIn: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "none" | "lax" | "strict" | undefined;
  secure?: boolean;
}

// parse env to integrate with fallback
const accessTokenExpiresIn = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES || "300",
  10
);
const refreshTokenExpiresIn = parseInt(
  process.env.REFRESH_TOKEN_EXPIRES || "1200",
  10
);

export const accessTokenOptions: ITokenOptions = {
  expiresIn: new Date(Date.now() + accessTokenExpiresIn * 60 * 60 * 1000),
  maxAge: accessTokenExpiresIn * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expiresIn: new Date(Date.now() + refreshTokenExpiresIn * 60 * 60 * 1000),
  maxAge: refreshTokenExpiresIn * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // store refresh token in redis
  redis.set(user._id, JSON.stringify(user) as any);

  // set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    message: "Logged in successfully",
    user,
    accessToken,
  });
};

import { Redis } from "ioredis";
require("dotenv").config();

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("redis connected");
    return process.env.REDIS_URL;
  } else {
    throw new Error("REDIS_URL is not defined");
  }
};

export const redis = new Redis(redisClient());

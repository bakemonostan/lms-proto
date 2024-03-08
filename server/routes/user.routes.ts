import express from "express";
import {
  activateUser,
  getSocialAuth,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizedRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", getSocialAuth);

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);





export default userRouter;
   
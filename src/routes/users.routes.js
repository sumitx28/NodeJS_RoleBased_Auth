// const router = require("express").Router();
import { Router } from "express";
const router = Router();
// const userRoute = require("./users.route.js");
import passport from "passport";
import { validateJwtandExtractuserInfoMiddleware } from "../middlewares/auth.middleware.js";
import { USER_ROUTES } from "../utils/constants.js";
import {
  LoginController,
  LogoutController,
  RegisterController,
  refreshAccessToken,
} from "../controllers/userController.controller.js";

/**
 * @GENERAL_ROUTE - route for user with any role
 */
//route to register user
router.post(USER_ROUTES.REGISTER_USER, RegisterController);

// TODO: implement the custome authenticate function for custome error msg and status code
// app.post("/login", loginMiddleware, (req, res, next) => {
router.post(USER_ROUTES.LOGIN_USER, LoginController);

router.post(USER_ROUTES.LOGOUT_USER, validateJwtandExtractuserInfoMiddleware, LogoutController);
router.post(USER_ROUTES.REFRESHACCESSTOKEN, refreshAccessToken);

export default router;

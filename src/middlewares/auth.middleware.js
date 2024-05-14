import passport from "passport";
import { ApiError } from "../utils/ApiError.js";
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @DESC need this middle ware for login route - read the comment below.
 */

// this middleware is for login route , while req hits the login route - server will call authenticate method from passport and it will return either user or error. in case of error we want to customize the status code and messege, Thats why we are writing this middleware.
export const loginMiddleware = async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(new ApiError(err.statusCode, err.message, err.errors));
    }
    if (!user) {
      // Handle authentication failure
      next(new ApiError(400, "user not found"));
    }
    // Log in the user
    req.logIn(user, function (err) {
      if (err) {
        return next(new ApiError(err.statusCode, err.message, err.errors));
      }
      // Authentication successful, redirect to dashboard
      next();
    });
  })(req, res, next);
};

// this middleware to identify whether user is authenticated or not
export const userAuthenticationMiddleware = (req, res, next) => {
  if (req.isAuthenicated()) {
    next();
  } else {
    next(
      new ApiError(
        401,
        "User is not Authenticated ,Please Login In to Access The Resources"
      )
    );
  }
};
// this middleware to identify whether user is authenticated or not and if user is admin user or not
export const adminAuthenticationMiddleware = (req, res, next) => {
  if (req.isAuthenicated() && req.user.isAdmin) {
    next();
  } else {
    next(
      new ApiError(
        401,
        "User is not Authenticated ,Please Login In to Access The Resources"
      )
    );
  }
};

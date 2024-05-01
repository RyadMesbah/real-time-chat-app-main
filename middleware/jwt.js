import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    //////////////////////////////////////////////////////////////////
    if (err) return next(createError(403, "Token is not valid!"));
    const user = await user.findOne({ _id: payload.id });
    req.user = user;
    next();
  });
};

export const checkIfUserIsModerator = (req, res, next) => {
  if (req.role !== "moderator") {
    return next(createError(403, "You are not authorized!"));
  }
  next();
};

export const checkIfUserIsExpert = (req, res, next) => {
  if (req.role !== "expert") {
    return next(createError(403, "You are not authorized!"));
  }
  next();
};

export const checkIfUserIsAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return next(createError(403, "You are not authorized!"));
  }
  next();
};

export const checkIfUserIsBlocked = (req, res, next) => {
  if (req.user.status === "blocked") {
    return next(createError(403, "Your account is blocked!"));
  }
  next();
};

export const checkIfUserIsDeblocked = (req, res, next) => {
  if (req.user.status !== "blocked") {
    return next(createError(403, "Your account is deblocked!"));
  }
  next();
};

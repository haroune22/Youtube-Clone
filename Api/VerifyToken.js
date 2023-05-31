import jwt from "jsonwebtoken";
import { createError } from "./Error.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token
 if(token){
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  }else{
    return next(createError(401, "You are not authenticated!"));
  }
};

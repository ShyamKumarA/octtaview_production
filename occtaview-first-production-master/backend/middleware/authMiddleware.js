import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"



export const protectUser = asyncHandler(async (req, res, next) => {
  let token;
  console.log("reached here");
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "Shyam");
      req.user = await User.findById(decoded.userId).select("-password");
        // console.log(req.user);

      next();

    } catch (error) {
        next(error);
    }
  }

  if (!token) {
    
    return next(errorHandler(401,'Not authenticated, No token'))
  }
  
});
// import { errorHandler } from "./errorHandler.js";

// export const protectUser = asyncHandler(async (req, res, next) => {
  
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     let token;
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, "Shyam");
//       req.user = await User.findById(decoded.userId).select("-password");
//       if(req.user){
//         next();
//       }
//     } catch (error) {
//       throw new Error(error);
//     }
//     if (!token) {
//       throw new Error("Not authenticated, token failed")
//     }
//   }

// });

// export const protectUser = asyncHandler(async (req, res, next) => {
//   console.log("reached here");

//   let token;
  
//   if (
//     req.headers.authorization && req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, "Shyam");
//       req.user = await User.findById(decoded.userId).select("-password");
//       if (token) {
//         next(); 
//       }else{
//         res.status(401);
//         throw new Error("Not authenticated, No token");
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authenticated, token failed");
//     }
//   }

 
// });

// export const protectUser = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization && req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, "Shyam");
//       req.user = await User.findById(decoded.userId).select("-password");
//       console.log(token);
//       next(); // Call next() only if the token is successfully verified
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error("Not authenticated, token failed");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not authenticated, No token");
//   }
// });

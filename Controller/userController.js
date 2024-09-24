import User from "../Model/User.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const getAllUser = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const Users = await User.find();
        res.status(200).json({ Users: Users });
      } else {
        return next(
          new ApiError("You are not Authentcator to use this Feature", 404)
        );
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};
export const getOneUser = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const id = req.params.id;
        if (req.user.id == id || req.user.isAdmin) {
          const oneUser = await User.findById({ _id: id });
          res.status(200).json({ user: oneUser });
        } else {
          return next(new ApiError("You don't have access", 404));
        }
      } else {
        return next(
          new ApiError("You are not Authentcator to use this Feature", 404)
        );
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Get ", 400));
  }
};
export const updateUser = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const userid = req.params.id;
        if (req.user.id == userid || req.user.isAdmin) {
          const newData = await User.findByIdAndUpdate(
            userid,
            { $set: req.body },
            { new: true }
          );
          res.status(200).json({
            message: "User is Updated",
            User: newData,
          });
        } else {
          return next(new ApiError("You don't have access", 404));
        }
      } else {
        return next(new ApiError("You are not Admin to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteUser= async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const userid = req.params.id;
        if (req.user.id == userid || req.user.isAdmin) {
          await User.findByIdAndDelete({ _id: userid });
          res.status(200).json({ message: "User is Deleted" });
        } else {
          return next(new ApiError("You don't have access", 404));
        }
      } else {
        return next(new ApiError("You are not Admin to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};

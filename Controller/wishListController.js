import wishList from "../Model/wishList.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createWishList = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (!req.user.isAdmin) {
        const { courseId } = req.body;
        const newCourse = new wishList({
          UserId: req.user.id,
          CourseId: courseId,
        });
        await newCourse.save();
        res
          .status(200)
          .json({ message: "You add new Course in Your WishList" });
      } else {
        return next(new ApiError("You Are not Authenticated", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllYourWishLists = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const YourwishList = await wishList
          .find({ UserId: req.user.id })
          .populate({ path: "UserId", select: "name-_id" })
          .populate({
            path: "CourseId",
            select: "title description price discount priceAfDis -_id",
          });
        res.status(200).json({ Courses: YourwishList });
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

export const getOneWishList = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const id = req.params.id;
        const onewishList = await wishList
          .findById({ _id: id })
          .populate({ path: "UserId", select: "name-_id" })
          .populate({
            path: "CourseId",
            select: "title description price discount priceAfDis -_id",
          });
        res.status(200).json({ wishList: onewishList });
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

export const deleteWishlist = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (!req.user.isAdmin) {
        const wishListId = req.params.wishListId;
        await wishList.findByIdAndDelete({ _id: wishListId });
        res.status(200).json({ message: "Wish list Deleted is Deleted" });
      } else {
        return next(new ApiError("You are not User to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};

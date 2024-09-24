import OwnCourse from "../Model/OwnCourse.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createownCourse = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (!req.user.isAdmin) {
        const { courseId } = req.body;
        const newCourse = new OwnCourse({
          UserId: req.user.id,
          CourseId: courseId,
        });
        await newCourse.save();
        res
          .status(200)
          .json({ message: "You add new Course in Your ownCourse" });
      } else {
        return next(new ApiError("You Are not Authenticated", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllYourownCourses = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const YourownCourse = await OwnCourse
          .find({ UserId: req.user.id })
          .populate({ path: "UserId", select: "name-_id" })
          .populate({
            path: "CourseId",
            select: "title description price discount priceAfDis -_id",
          });
        res.status(200).json({ Courses: YourownCourse });
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

export const getOneownCourse = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const id = req.params.id;
        const oneownCourse = await OwnCourse
          .findById({ _id: id })
          .populate({ path: "UserId", select: "name-_id" })
          .populate({
            path: "CourseId",
            select: "title description price discount priceAfDis -_id",
          });
        res.status(200).json({ ownCourse: oneownCourse });
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

export const deleteownCourse = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (!req.user.isAdmin) {
        const ownCourseId = req.params.ownCourseId;
        await OwnCourse.findByIdAndDelete({ _id: ownCourseId });
        res.status(200).json({ message: "Your Own Course is Deleted" });
      } else {
        return next(new ApiError("You are not User to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};

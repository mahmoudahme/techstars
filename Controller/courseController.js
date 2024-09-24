import Course from "../Model/Course.js";
import { ApiError } from "../Utils/apiError.js";
import { verifyToken } from "../Utils/verifyToken.js";

export const createCourse = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const {
          title,
          typeOfCourse,
          description,
          insatructor,
          about,
          rating,
          price,
          discount,
          language,
          calender,
        } = req.body;
        const newCourse = new Course({
          title: title,
          typeOfCourse: typeOfCourse,
          insatructor: insatructor,
          about: about,
          description: description,
          rating: rating,
          price: price,
          discount: discount,
          priceAfDis: price - (discount / 100) * price,
          language: language,
          calender: calender,
        });
        await newCourse.save();
        res.status(200).json({ message: "New Course Created" });
      } else {
        return next(new ApiError("You are not Admin to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Creation", 400));
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const page = parseInt(req.query.page) // الصفحة الحالية
        const limit = parseInt(req.query.limit) ||2; // عدد العناصر في كل صفحة
        const skip = (page - 1) * limit;
        if (req.query.type == "All" || !req.query.type) {
          const Courses = await Course.find().skip(skip).limit(limit).exec();
          res.status(200).json({ Courses: Courses });
        } else {
          const query = req.query.type;
          const Courses = await Course.find({ typeOfCourse: query }).skip(skip).limit(limit).exec();
          res.status(200).json({ Courses: Courses });
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

export const getOneCourse = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
        const id = req.params.id;
        const oneCourse = await Course.findById({ _id: id });
        res.status(200).json({ Course: oneCourse });
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

export const updateCourse = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const CourseId = req.params.CourseId;
        const newCourse = await Course.findByIdAndUpdate(
          CourseId,
          { $set: req.body },
          { new: true }
        );
        const UpdatePrice = await Course.findByIdAndUpdate(
          CourseId,
          {
            priceAfDis:
              newCourse.price - (newCourse.discount / 100) * newCourse.price,
          },
          { new: true }
        );
        res.status(200).json({
          message: "Course is Updated",
          Course: UpdatePrice,
        });
      } else {
        return next(new ApiError("You are not Admin to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};
export const deleteCourse = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        const CourseId = req.params.CourseId;
        await Course.findByIdAndDelete({ _id: CourseId });
        res.status(200).json({ message: "Course is Deleted" });
      } else {
        return next(new ApiError("You are not Admin to use this Feature", 404));
      }
    });
  } catch (error) {
    return next(new ApiError("Error in Update", 400));
  }
};

export const mostNewest = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      if (req.user) {
          const Courses = await Course.find() .sort({ createdAt: -1 }).limit(3).exec();
          res.status(200).json({ Courses: Courses });
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
import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
} from "../Controller/courseController.js";
const router = express.Router();

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getOneCourse);
router.put("/:CourseId", updateCourse);
router.delete("/:CourseId", deleteCourse);
export default router;

import express from "express";
import {
  createownCourse ,
  deleteownCourse,
  getAllYourownCourses,
  getOneownCourse
  
} from "../Controller/ownCourseController.js";
const router = express.Router();

router.post("/", createownCourse);
router.get("/", getAllYourownCourses);
router.get("/:id", getOneownCourse);
router.delete("/:ownCourseId", deleteownCourse);
export default router;

import express from "express";
import {
  mostNewest
} from "../Controller/courseController.js";
const router = express.Router();


router.get("/", mostNewest);

export default router;

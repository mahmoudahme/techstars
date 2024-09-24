import express from "express";
import {
  getAllUser ,
  getOneUser ,
  deleteUser,
  updateUser
} from "../Controller/userController.js";
const router = express.Router();


router.get("/", getAllUser);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;

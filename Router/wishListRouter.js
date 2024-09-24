import express from "express";
import {
  createWishList ,
  deleteWishlist,
  getAllYourWishLists,
  getOneWishList
  
} from "../Controller/wishListController.js";
const router = express.Router();

router.post("/", createWishList);
router.get("/", getAllYourWishLists);
router.get("/:id", getOneWishList);
router.delete("/:wishListId", deleteWishlist);
export default router;

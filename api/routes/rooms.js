import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/:hotelId",verifyAdmin, createRoom)

//update
router.put("/:id",verifyAdmin, updateRoom)

//Delete
router.delete("/:id/:hotelId",verifyAdmin, deleteRoom)

//Get
router.get("/:id",getRoom)

//Get All
router.get("/", getAllRooms)


export default router
import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/",verifyAdmin, createHotel)

//update
router.put("/:id",verifyAdmin, updateHotel)

//Delete
router.delete("/:id",verifyAdmin, deleteHotel)

//Get
router.get("/find/:id",getHotel)

//Get All
router.get("/", getAllHotels)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType)



export default router
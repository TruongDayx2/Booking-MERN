import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

//Create
export const createRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    const newRoom = new Room (req.body)
    try {
        const saveRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push: {rooms:saveRoom._id}})
        } catch (err) {
            next(err)
        }
        res.json(saveRoom)
    } catch (err) {
        next(err)
    }
}

//Update
export const updateRoom = async (req,res,next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        // set to update in mongoDB & new:true to show Json Results when update on Post
        res.json(updatedRoom)
    } catch (err) {
       next(err)
    }
}

//Delete
export const deleteRoom = async (req,res,next)=>{
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull: {rooms:req.params.id}})
        } catch (err) {
            next(err)
        }
        res.json("Room has been deleted.")
    } catch (err) {
       next(err)
    }
}

//Get
export const getRoom = async (req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.json(room)
    } catch (err) {
       next(err)
    }
}

//GetAll
export const getAllRooms = async (req,res,next)=>{
    try {
        const rooms = await Room.find()
        res.json(rooms)
    } catch (err) {
       next(err)
    }
}
import User from "../models/User.js"



//Update
export const updateUser = async (req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        // set to update in mongoDB & new:true to show Json Results when update on Post
        res.json(updatedUser)
    } catch (err) {
       next(err)
    }
}

//Delete
export const deleteUser = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json("User has been deleted.")
    } catch (err) {
       next(err)
    }
}

//Get
export const getUser = async (req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
       next(err)
    }
}

//GetAll
export const getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
       next(err)
    }
}

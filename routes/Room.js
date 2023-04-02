const express =require("express");
// import {Room} from "../model/room.js"
const router = express.Router();

// api for creating room with 1.number of seats available,2.amenities,3.pricee

router.post("/rooms",async(req,res)=>{
    try{
        const {seatsAvailable,amenities,pricePerHour}=req.body;
        // const rooms = await new Room(req.body).save();
        // if(!rooms){
        //     res.status(400).json({message:"error creating room"});
        // }
        // else{
        //     res.status(200).json({message:"room created successfully"});
        // }
    }
    catch(eror){
        res.status(500).json({message:"Internal Server Error"});
    }
})

exports.roomRouter = router;
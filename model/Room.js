import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    RoomNo:{
        type:Number,
        required:true,
    },
    seatsAvailable:{
        type:Number,
        required :true,
    },
    amenities:{
        type: [String],
        required : true,
    },
    pricePerHour:{
        type: Number,
        required:true
    },
    bookingStatus:{
        type:String,
        enum:["Free","Booked","Cancelled"],
        default:"Free"
    }
})


const Room = mongoose.model("Room",roomSchema)
export {Room}
import express from "express";
import { Booking} from "../model/booking.js";
import { Room } from "../model/room.js"
import Obj from "mongodb";
export var ObjectId = Obj.ObjectId;

const router = express.Router();

//api for for booking room with 1.customer name,2.date,3.start time,4.end time,5.room._Id
router.post("/bookings", async(req,res)=>{
   
    const{CustomerName,Date,StartTime,EndTime,RoomNo}=req.body;
    const user = await Booking.findOne({CustomerName:CustomerName});
    if(user){
        res.status(400).json({message:"Customer has already been added"})
    }
    else{
        try{ 
            const rooms = await Room.findOne({RoomNo:RoomNo});
            if(!rooms){
                res.status(404).json({message:"room not found"})
            }else {
          const newBooking = await new Booking({CustomerName,Date,StartTime,EndTime,RoomNo:rooms.RoomNo}).save();
           const roomstatus= await  Room.findOneAndUpdate({RoomNo:rooms.RoomNo},{bookingStatus:"Booked"})
          if(!newBooking){
            res.status(400).json({message:"error booking room"});
        }
        else{
            res.status(200).json({message:"room booked successfully"});
        }
        }
            }
            catch(error){
                console.log(error);
                res.status(500).json({message:"Internal Server Error"});
            }
    }
})


//api for list all rooms with booked data with 1.room no 2. booked status 3. customer name,4.date,5,start time,6.endtime

router.get("/rooms",async(req,res)=>{
    try{
const rooms= await Room.find();
const booking = await Booking.find();
const data = rooms.map(room=>{
    const bookings = booking.find(bookings=>bookings.RoomNo === room.RoomNo);
if(bookings){
    return{
        roomNumber: room.RoomNo,
        bookingstatus: room.bookingStatus,
        customerName: bookings.CustomerName,
        date: bookings.Date,
        startTime: bookings.StartTime,
        endTime: bookings.EndTime
    }
}
else{
    return {
        roomNumber: room.RoomNo,
        bookingstatus: room.bookingStatus
      };
}
})
res.status(400).json(data)
    }
    catch(error){
        console.log(error)
 res.status(500).json({message:"Internal Server Error"});
    }
});



//api for  list all customers with1.cutomername,2.room no,3.date,4,start time,5.endtime
router.get("/customers",async(req,res)=>{
    try{
        const rooms= await Room.find();
const bookings = await Booking.find();
const data = bookings.map(booking=>({
        roomNumber: booking.RoomNo,
        customerName: booking.CustomerName,
        date: booking.Date,
        startTime:booking.StartTime,
        endTime: booking.EndTime

})

)
res.status(400).json(data)
    }
    catch(error){
        console.log(error)
 res.status(500).json({message:"Internal Server Error"});
    }
});

// api for list how many customers has booked room with below data  1.CustomerName,2.Room number,3.date,4.start time,5.end time.6.booking status,7.booking id,8.booking date

router.get("/bookings/count",async(req,res)=>{
    try{
const bookings= await Booking.find({bookingStatus:"Booked"})
res.status(400).json(bookings);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"});
           }
})



export const bookingRouter = router;
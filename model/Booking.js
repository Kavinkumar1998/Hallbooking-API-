import mongoose from"mongoose";

const bookingSchema = new mongoose.Schema({
    CustomerName :{
        type: String,
        required: true
    },

    Date:{
        type: String,
        required:true,
    },
    StartTime:{
        type: String,
        required: true
    },
    EndTime: {
      type: String,
      required: true,
    },
        RoomNo:{
            type:Number,
            ref: 'Room',
            required:true,
        }
});

const Booking = new mongoose.model("Booking",bookingSchema);
export {Booking}
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { roomRouter } from "./routes/Room.js";
import { databaseConnection } from "./db.js";
import { bookingRouter } from "./routes/bookings.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
databaseConnection();
const PORT= process.env.PORT;


app.get("/",async(req,res)=>{
    res.send("welcome to hallbookin api")
})

app.use("/api/createroom",roomRouter);
app.use("/api/book",bookingRouter);


app.listen(PORT,()=>console.log(`sever started at ${PORT}`));
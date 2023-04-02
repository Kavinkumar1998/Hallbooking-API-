const express =require("express") ;
const dotenv =require("dotenv") ;
const cors =require("cors") ;
const { roomRouter } =require( "./routes/Room.js");
const { databaseConnection } =require("./db.js") ;
const { bookingRouter } =require("./routes/Bookings.js");


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
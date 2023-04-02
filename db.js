const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();


function databaseConnection(){
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try{
        mongoose.connect(process.env.MONGO_URL,params);
        console.log("Mongodb is connected")
    }
    catch(error){
        console.log("Mongodb connection error",error)    }
}
exports.databaseConnection= databaseConnection;
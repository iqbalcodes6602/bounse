const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI ;

const connectDB = async()=>{
    
    // try{
    //     const conn = await mongoose.connect(`${MONGODB_URI}`,{
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     });
    //     console.log(`MongoDB Conencted ${conn.connection.host}`);
    // }catch(error){
    //     console.log(`Error: ${error.message}`);
    //     process.exit();
    //
    // }
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/chatDB",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Conencted ${conn.connection.host}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
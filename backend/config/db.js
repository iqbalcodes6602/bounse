const mongoose = require("mongoose");

const connectDB = async()=>{
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
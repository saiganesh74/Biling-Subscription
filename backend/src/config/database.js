const mongoose = require("mongoose");

const connectDatabase = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB successfully connected")
    }catch(error){
        console.error("Connection Failed",error.message);
        process.exit(1);
    }
}
module.exports = connectDatabase;
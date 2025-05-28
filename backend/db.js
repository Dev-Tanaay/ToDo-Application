const mongoose=require("mongoose");

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }

}

const todoSchema=new mongoose.Schema({
    title:String,
    description:String,
    completion:Boolean
})
const Todo=mongoose.model("Todo",todoSchema);
module.exports={ Todo, dbConnect };
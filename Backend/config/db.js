// import necessary libraries
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongo DB !')
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
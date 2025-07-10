import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => 
            console.log("Database Connected")
        );
        
        // Remove /greencart from the connection string since it's already in MONGODB_URI
        await mongoose.connect(process.env.MONGODB_URI);  // <- Only change needed
        
    } catch(error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);  // Added to exit on connection failure
    }
};

export default connectDB;
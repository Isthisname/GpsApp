
import mongoose from "mongoose";

export const connectDB = async (dbUrl) => {
    await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(err => {
            console.error('Error connecting to MongoDB Atlas:', err);
            process.exit(1);
        });
}
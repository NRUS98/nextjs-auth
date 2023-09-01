import mongoose from "mongoose";

export const connect = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB connected successfully");
      });
      connection.on("error", (err) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        process.exit();
      });
    }
  } catch (error) {
    console.error(error);
  }
};

import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/paytm`);
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.log(`Database Connections failed . . . . !`);
    console.log(error);
  }
};

import mongoose from "mongoose";

async function configDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database Connected");
  } catch (error) {
    console.error(`Error while connecting database: ${error}`);
  }
}

export default configDatabase;

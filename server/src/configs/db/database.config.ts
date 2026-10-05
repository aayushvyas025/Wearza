import mongoose from "mongoose";

async function configDatabase() {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("Database Connected");
}

export default configDatabase;

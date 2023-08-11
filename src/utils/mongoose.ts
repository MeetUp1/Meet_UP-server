import mongoose from "mongoose";

function connectMongoDB() {
  mongoose.set("strictQuery", false);

  if (!process.env.SECRET_MONGODB_ID) {
    throw new Error(
      "MongoDB connection string is missing in environment variables.",
    );
  }

  mongoose.connect(process.env.SECRET_MONGODB_ID);

  const db = mongoose.connection;

  db.on("error", (err: Error) => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", () => {
    console.log("MongoDB server connected.");
  });
}

export default connectMongoDB;

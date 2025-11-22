import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express(); //app: Express type

const PORT: number = Number(process.env.PORT) || 5555;

const startServer = async (): Promise<any> => {
  try {
    app.listen(PORT, () => {
      console.log(`✅Server is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error("❌Start up error:", err);
    process.exit(1);
  }
};

startServer();

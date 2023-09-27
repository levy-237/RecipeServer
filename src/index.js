import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { usersRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/recipes", recipeRouter);
mongoose.connect(process.env.MONGO_DB);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("WORKING...");
});

export default app;

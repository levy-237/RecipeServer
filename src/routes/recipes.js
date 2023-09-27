import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import { useImperativeHandle } from "react";
import { userModel } from "../models/Users.js";
import { verifyToken } from "../middleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/savedRecipes/ids/:userID", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    console.log(error);
  }
});

router.get("/savedRecipes/:userID", verifyToken, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(201).json({ savedRecipes });
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
});

export { router as recipeRouter };

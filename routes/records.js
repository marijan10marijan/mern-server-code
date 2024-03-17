import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connection.js";

const router = express.Router();

// GET ALL RECORDS ************************************
router.get("/", async (req, res) => {
  const collection = await db.collection("records").find({}).toArray();
  res.send(collection).status(200);
});

// GET A SINGLE RECORD ************************************
router.get("/:id", async (req, res) => {
  const collection = await db
    .collection("records")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (!collection) return res.send("Record not found").status(404);
  else return res.send(collection).status(200);
});

// CREATE A NEW RECORD ************************************
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      position: req.body.position,
      gender: req.body.gender,
      level: req.body.level,
    };
    const collection = await db.collection("records").insertOne(newDocument);
    res.send(collection).status(201);
  } catch (error) {
    console.error(error);
    res.send(error + "Error").status(500);
  }
});

// UPDATE A RECORD ************************************
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    let collection = await db.collection("records").updateOne(query, updates);
    res.send(collection).status(200);
  } catch (error) {
    console.error(error);
    res.send(error + "Error").status(500);
  }
});

// DELETE A RECORD ************************************
router.delete("/:id", async (req, res) => {
  try {
    const collection = await db
      .collection("records")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.send(collection).status(200);
  } catch (error) {
    console.error(error);
    res.send(error + "Error").status(500);
  }
});

export default router;

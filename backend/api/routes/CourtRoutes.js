const express = require("express");
const { getAllCourts, addNewCourt, getACourt, updateACourt, deleteACourt } = require("../controllers/courtControllers");
const courtRouter = express.Router();

// Get all courts within a certain distance of user location
courtRouter.get("/", getAllCourts);

// Add a new court to the database
courtRouter.post("/", addNewCourt);

// Get a specific court by its ID
courtRouter.get("/:courtId", getACourt);

// Update a specific court by its ID
courtRouter.put("/", updateACourt);

// Delete a specific court by its ID
courtRouter.delete("/:courtId", deleteACourt);

module.exports = courtRouter;
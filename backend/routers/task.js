const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const isLoggedIn = require("../middlewares.js");

// Create a new task & Get all tasks
router
  .route("/")
  .post(isLoggedIn, async (req, res) => {
    try {
      let { title, dueDate } = req.body;
      if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
      }
      const newTask = new Task({ title, dueDate, userId: req.user._id });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .get(isLoggedIn, async (req, res) => {
    try {
      const tasks = await Task.find({ userId: req.user._id });
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Mark task as completed
router.put("/:id/complete", isLoggedIn, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task & Delete a task
router
  .route("/:id")
  .put(isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, dueDate } = req.body;
    try {
      if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
      }
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        { title, dueDate },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })
  .delete(isLoggedIn, async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;

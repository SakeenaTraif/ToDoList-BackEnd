const express = require("express");
const {taskCreate, taskList,taskDetails,  taskDelete, taskUpdate, fetchTask} = require("../controllers/TaskController");

const route = express.Router();

    route.param("taskId", async (req, res, next, taskId) => {
    const taskFound = await fetchTask(taskId, next);
    if (taskFound) {
      req.task = taskFound;
      next();
    } else {
      const error = new Error("No Task Match");
      error.status = 404;
      next(error);
    }
  });

    // Create Route
    route.post("/", taskCreate);
    
    // List Route
    route.get("/", taskList);
  
    // Detail Route 
    route.get("/:taskId", taskDetails);
  
    //Delete Route
    route.delete("/:taskId", taskDelete);
  
    //Update Method
    route.put("/:taskId", taskUpdate);

module.exports = route;
const {Task} = require("../db/models");

exports.fetchTask = async (taskId, next) => {
    try {
      const taskFound = await Task.findByPk(taskId);
      if (taskFound) return taskFound;
      else next({ message: "Task dosen't Exist" });
    } catch (error) {
      next(error);
    }
  };

exports.taskCreate =  async(req, res, next) => {
    try {
      const newTask = await Task.create(req.body);
      res.status(201).json(newTask );
    } catch (error) {
        next (error); 
        }
    };

exports.taskList = async(req, res, next) => {
    try {
      const _tasks = await Task.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }});
      res.json(_tasks);
    } catch (error) {
      next (error); 
    }
  };

  exports.taskDetails = async(req, res, next) => {
    try {
      const foundtask = await Task.findByPk(req.params.taskId);
      if (foundtask){
        res.json(foundtask);}
        else{
            next({message: "Task Not Found"});
          }
    } catch (error) {
      next (error); 
    }
  };

  exports.taskDelete = async(req, res, next) => {
    try {
      const foundtask = await Task.findByPk(req.params.taskId);
        if (foundtask){
           await foundtask.destroy();
               res.status(204).end();}
               else{
            next({message: "No Task Match"});
        }
     } catch (error) {
        next (error); 
        }
        };

    exports.taskUpdate = async(req, res,next) => {
        const { taskId } = req.params;
        try {
            const foundtask = await Task.findByPk(taskId);
            if (foundtask) {
              await foundtask.update(req.body);
              res.status(204).end();
            } else {
             next({message: "No Task Match"});
    }
        } catch (error) {
          next (error); 
        }
      };
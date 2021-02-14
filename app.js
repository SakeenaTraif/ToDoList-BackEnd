const express = require("express");
const cors = require("cors");
const db = require("./db/models");
const taskRoute = require("./routes/tasks");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use("/tasks",taskRoute);

//Not Found Middleware
app.use((req,res,next) =>{
    next({
      status:404,
      message:"Path Not Found",
    });
  });
  
  //Error Handling Middleware
  app.use((err,req,res,next) =>{
    res
    .status(err.status || 500)
    .json({message : err.message || "Internal Server Error",});
  });

 

//db.sequelize.sync();
 db.sequelize.sync({alter: true});
 //db.sequelize.sync({force: true});

app.listen(8000, () => {
 console.log("This application is running on localhost:8000");
});
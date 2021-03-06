// Import task handker
const Task = require('../api/task');

// Init router
const express = require('express');
const router = express.Router();

// Init body parser
const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Init database hook
const mongoose = require('mongoose');
const uri = "mongodb+srv://cmk:342124@todolist-c483l.gcp.mongodb.net/todolist?retryWrites=true";
var connectionStatus = mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if(err){
    throw err;
  }
  console.log("Connected to database successfully!");
});
const db = mongoose.connection;

// Get home page
router.get('/', (req, res) => res.send('Use localhost:5000/api/tasks'));

// Get tasks
router.get('/api/tasks', (req, res) => {
  Task.getTasks((err, tasks) => {
    if(err){
      throw err;
    }
    res.json(tasks);
  })
});

// Add task
router.post('/api/tasks', (req, res) => {
  var task = req.body;
  Task.addTask(task, (err, task) => {
    if(err){
      throw err;
    }
    res.json(task);
  })
});

// Update task
router.put('/api/tasks/:_id', (req, res) => {
  var id = req.params._id;
  var updatedTask = req.body;
  Task.updateTask(id, updatedTask, {}, (err, updatedTask) => {
    if(err){
      throw err;
    }
    res.json(updatedTask);
  })
});

// Delete task
router.delete('/api/tasks/:_id', (req, res) => {
  var id = req.params._id;
  Task.removeTask(id, (err, task) => {
    if(err){
      throw err;
    }
    res.json(task);
  })
});

module.exports = router;

const express = require('express');
const tasksData = require('../data.json'); // Importing the data.json file

const router = express.Router();

// Retrieve all tasks
router.get('/tasks', (req, res) => {
    res.json(tasksData.tasks); // Sending only the task data, no need to send the complete object with the "tasks" key
});

// Create a new task
router.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const newTask = {
        id: tasksData.tasks.length + 1, // Generating a new ID based on the current length of the tasks array
        title,
        completed
    };
    tasksData.tasks.push(newTask); // Adding the new task to the data array
    res.status(201).json(newTask); // Sending the new task with status code 201 (Created)
});

// Update an existing task
router.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const taskToUpdate = tasksData.tasks.find(task => task.id === taskId);
    if (taskToUpdate) {
        taskToUpdate.title = title || taskToUpdate.title;
        taskToUpdate.completed = completed || taskToUpdate.completed;
        res.json(taskToUpdate);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete an existing task
router.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasksData.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasksData.tasks.splice(index, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

module.exports = router;

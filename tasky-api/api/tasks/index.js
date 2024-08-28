import express from 'express';
import Task from './taskModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find().populate('userId', 'username');
    res.status(200).json(tasks);
});

// Get task by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id).populate('userId', 'username');
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    res.status(200).json(task);
}));

// Create a new task
router.post('/', asyncHandler(async (req, res) => {
    const task = await Task(req.body).save();
    res.status(201).json(task);
}));

// Update an existing task
router.put('/:id', asyncHandler(async (req, res) => {
    if (req.body._id) delete req.body._id;
    req.body.updated_at = new Date();
    const result = await Task.updateOne({ _id: req.params.id }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'Task Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
}));

// Delete a task
router.delete('/:id', asyncHandler(async (req, res) => {
    const result = await Task.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
}));
// register(Create)/Authenticate User
router.post('/', async (req, res, next) => {
    try {
        if (req.query.action === 'register') {
            await User(req.body).save();
            res.status(201).json({
                code: 201,
                msg: 'Successfully created new user.',
            });
        } else {
            const user = await User.findOne(req.body);
            if (!user) {
                return res.status(401).json({ code: 401, msg: 'Authentication failed' });
            } else {
                return res.status(200).json({ code: 200, msg: "Authentication Successful", token: 'TEMPORARY_TOKEN' });
            }
        }
    } catch (error) {
        next(error);  // Passes the error to the error-handling middleware
    }
});


export default router;

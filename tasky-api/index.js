import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import tasksRouter from './api/tasks';
import usersRouter from './api/users';
import './db';

dotenv.config();

const app = express();

const port = process.env.PORT || 8080; // Use port from environment or default to 8080

// Middleware

app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
      return res.status(400).json({
          success: false,
          message: err.message,
          errors: err.errors
      });
  }
  if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({ success: false, message: 'Something went wrong!' });
  } else {
      return res.status(500).json({ success: false, message: err.stack });
  }
});

// Routes
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter);

// Error handling middleware
const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Something went wrong!');
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};
app.use(errHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

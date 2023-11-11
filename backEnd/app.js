const express = require('express');

//ROUTERS
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

//Routes
app.use('/', viewRouter);
app.use('/api/v1/user', userRouter);

module.exports = app;
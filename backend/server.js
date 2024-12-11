const express = require('express')
require("dotenv").config();
const cors = require('cors')
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/todos', require('./routes/todoRoutes'))


// error handler
app.use(errorHandler)

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
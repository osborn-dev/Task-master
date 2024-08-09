const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect('mongodb+srv://chijiokerayeke:mycluster10@chijscluster.ra0gyf5.mongodb.net/task')

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/todos', require('./routes/todoRoutes'))



// error handler
app.use(errorHandler)

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
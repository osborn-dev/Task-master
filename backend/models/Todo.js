const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date
    }
})
const TodoModel = mongoose.model('task', TodoSchema)

module.exports = TodoModel
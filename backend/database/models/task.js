const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 5
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});


const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
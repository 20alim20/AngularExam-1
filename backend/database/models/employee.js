const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 1
    },
    clockIn: {
        type: Date,
        default: Date.now
    },
    clockOut: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});


const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
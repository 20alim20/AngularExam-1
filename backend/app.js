const cors = require('cors')
const express = require('express');
const app = express();

const jwt = require("jsonwebtoken");
const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');
const Employee = require('./database/models/employee');
const User = require('./database/models/user');



app.use(express.json());
// app.use((req, res, next) => {
//     res.header()
// });

app.use(cors());

app.post('/login', (req, res) => {
    
    let HardCodedUser = new User({ 'username': 'admin', 'password': '12345' });
    
    if(req.body.username == HardCodedUser.username && req.body.password == HardCodedUser.password)
    {
        let jwtToken = jwt.sign({
            username: HardCodedUser.username,
            password: HardCodedUser.password
        }, "12345-token", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: HardCodedUser,
            success: true
        });
    }
    else
    {
        res.status(200).json({
            msg: 'user does not exists.',
            success: false
        });
    }
});

app.get('/employee', (req, res) => {
    Employee.find({})
        .then(emp => res.send(emp))
        .catch((error) => console.log(error));
});

app.post('/employee', (req, res) => {
    (new Employee({ 'name': req.body.name  }))
        .save()
        .then((employee) => res.send(employee))
        .catch((error) => console.log(error));
});

app.patch('/employee/:employeeId', (req, res) => {
    console.log(req.body);
    console.log('------------------------');
    console.log(req.body["_id"]);
    Employee.findOneAndUpdate({ _id: req.params.employeeId }, { $set: req.body })
    .then((emp) => res.send(emp))
    .catch((error) => console.log(error));
});


app.delete('/employee/:employeeId', (req, res) => {
    Employee.findByIdAndDelete(req.params.employeeId)
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
        .then(foundTask => res.send(foundTask))
        .catch((error) => console.log(error));
});

app.delete('/lists/:listId', (req, res) => {
    const deleteTasks = (lists) => {
        Task.deleteMany({_listId: list._id})
        .then(() => list)
        .catch((error) => console.log(error));
    };

    List.findByIdAndDelete(req.params.listId)
    .then((list) => res.send(deleteTasks(list)))
    .catch((error) => console.log(error));

    //res.send(list);
});

app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error));
});

app.post('/lists', (req, res) => {
    (new List({ 'title': req.body.title }))
        .save()
        .then((list) => res.send(list))
        .catch((error) => console.log(error));
});

//Don't forget that req.params.listId, the listId should match in the listId url
app.get('/lists/:listId', (req, res) => {
    List.find({ _id: req.params.listId })
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});

app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.listId }, { $set: req.body })
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
});


app.get('/tasks', (req, res) => {
    Task.find({})
        .then(tasks => res.send(tasks))
        .catch((error) => console.log(error));
});

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then(tasks => res.send(tasks))
        .catch((error) => console.log(error));
});

app.post('/lists/:listId/tasks', (req, res) => {
    (new Task({ 'title': req.body.title, '_listId': req.params.listId, 'completed': false }))
        .save()
        .then((zz) => res.send(zz))
        .catch((error) => console.log(error));
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
        .then(foundTask => res.send(foundTask))
        .catch((error) => console.log(error));
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId }, { $set: req.body })
        .then(foundTask => res.send(foundTask))
        .catch((error) => console.log(error));
});



app.listen(3000, () => console.log("Server Connected on port 3000"));

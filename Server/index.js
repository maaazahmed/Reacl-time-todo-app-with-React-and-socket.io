const express = require("express")
const app = express()
const socket = require("socket.io")
const Todo = require("./Modals/TodoModal")
const mongoose = require("mongoose")
const server = app.listen(8000)
mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");

// => CREATE CONNECTION BETWEEN SOCKET.IO AND SERVER
const io = socket(server)




// => CREATE CONNECTION 
io.on("connection", (socket) => {

    // => GET ALL TODOS FROM DATABASE AND SENDING TO CLIENT
    Todo.find().then((suc) => {
        io.sockets.emit("GET_PREV_TODO", suc)
    })


    // => SAVE NEW TODO IN DATABASE AND SEND TO CLIENT
    socket.on("ADD_TODO", (data) => {
        const todo = new Todo({
            todo: data.todo
        })
        todo.save((err, suc) => {
            io.sockets.emit("ADD_TODO", suc)
        })
    })


    // => DELETE TODO FROM DATABASE
    socket.on("DELTE_TODO", (data) => {
        Todo.deleteOne({ _id: data._id }, (err, suc) => {
            io.sockets.emit("DELTE_TODO", data)
        })
    })

    // =>  EDIT TODO FROM DATABASE
    socket.on("UPDATED_TODO", (data) => {
        Todo.updateOne({ _id: data._id }, { todo: data.todo }, (err, suc) => {
            io.sockets.emit("UPDATED_TODO", data)
        })
    })
})



import React, { Component } from 'react';
import io from "socket.io-client"




const socket = io("http://localhost:8000")

class Todo extends Component {
    constructor() {
        super()
        this.state = {
            todo: "",
            newTodo: "",
            isUpdateing: true,
            todoArray: [],
            updatedVal: {}
        }
    }
    componentWillMount() {
        // =>  GETTING ALL TODOS WHEN STARTING THE 
        socket.on("GET_PREV_TODO", (data) => {
            this.setState({
                todoArray: data
            })
        })
    }


    componentDidMount() {
        // => GETTING TODO WHEN ADD NEW ITEM IN DATABASE
        socket.on("ADD_TODO", (data) => {
            let a = this.state.todoArray
            a.push(data)
            this.setState({ todoArray: a })
        })

        // => GET ALL TODOS AFTER DELETEING ANY TODO ( WITHOUT DELETED TODO )
        socket.on("DELTE_TODO", (data) => {
            this.state.todoArray.map((val, ind) => {
                if (val._id === data._id) {
                    this.state.todoArray.splice(ind, 1)
                    this.setState({ todoArray: this.state.todoArray })
                }
            })
        })

        // => GET UPDATED TODO
        socket.on("UPDATED_TODO", (data) => {
            this.state.todoArray[data.index].todo = data.todo
            this.setState({
                 todoArray:this.state.todoArray
            })
        })
    }

    addTodo() {
        // => SENDING TODO FROM CLIENT TO SERVER ( SOCKER IO )
        socket.emit("ADD_TODO", {
            todo: this.state.todo
        })
        this.setState({
            todo:""
        })
    }

    deleteTodo(data) {
        // => DELETEING TODO 
        socket.emit("DELTE_TODO", data)
    }


    edit(data, ind) {
        data.index = ind
        this.setState({
            isUpdateing: false,
            updatedVal: data
        })
    }


    // => SENDING TODO FROM SERVER
    upDateTodo() {
        const obj = this.state.updatedVal
        obj.todo = this.state.newTodo
        socket.emit("UPDATED_TODO", obj)
        this.setState({
            isUpdateing:true,
            newTodo:""
        })
    }

    render() {
        return (
            <div >
                {(this.state.isUpdateing) ?
                    <div>
                        <input
                            type="text"
                            placeholder="Todo"
                            value={this.state.todo}
                            onChange={(ev) => this.setState({ todo: ev.target.value })} />
                        <button onClick={this.addTodo.bind(this)} >Add</button>
                    </div>
                    :
                    <div>
                        <input
                            type="text"
                            placeholder="New Value"
                            value={this.state.newTodo}
                            onChange={(ev) => this.setState({ newTodo: ev.target.value })} />
                        <button onClick={this.upDateTodo.bind(this)} >Updated</button>
                    </div>}
                <br />
                <ul>
                    {this.state.todoArray.map((val, ind) => {
                        return (
                            <li key={ind} >{val.todo} | | <button onClick={this.deleteTodo.bind(this, val)} >Delete</button>
                                <button onClick={this.edit.bind(this, val, ind)} >Edit</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Todo;


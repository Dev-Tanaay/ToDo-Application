const express = require('express');
const dotenv = require('dotenv');
const app = express();

const { createTodo,updateTodo } = require('./types');
const { dbConnect, Todo } = require('./db');
dotenv.config();

app.use(express.json());
dbConnect();

app.post("/todo", async (req, res) => {
    const { title, description } = req.body;
    const validation = createTodo(title, description);
    if (!validation.success) {
        return res.status(411).json({ "message": "You sent wrong Inputs", error: validation.error.errors });
    }
    const todo = await Todo.create({
        title,
        description,
        completion: false
    })
    if (todo) {
        return res.status(201).json({ "message": "Todo created successfully",todo });
    }
    else {
        return res.status(500).json({ "message": "Internal Server Error", error });
    };
});

app.get("/todos", async (req, res) => {
    const todos = await Todo.find({}, { _id: 0,__v:0 });
    if (!todos) {
        return res.status(404).json({ "message": "No todos found" });
    }
    return res.status(200).json({ "message": "Todos fetched successfully", todos });

})

app.put("/completed", async (req, res) => {
    const { id } = req.body;
    const validation = updateTodo(id);
    if (!validation.success) {
        return res.status(411).json({ "message": "You sent wrong Inputs", error: validation.error.errors });
    }
    const todos = await Todo.findById({ _id: id }, {
        completion: true
    });
    if (!todos) {
        return res.status(404).json({ "message": "Id not found" });
    }
    return res.status(200).json({ "message": "Todo updated successfully" });

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
import http from "node:http";
import { TodoListService } from "./todolist-service.mjs";

const todoListService = new TodoListService();

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET") {
        todoListService.getTodos(res);
    } else if (req.method === "POST") {
        todoListService.addTodo(req, res);
    } else if (req.method === "PUT") {
        todoListService.updateTodo(req, res);
    } else if (req.method === "DELETE") {
        todoListService.deleteTodo(req, res);
    }
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});

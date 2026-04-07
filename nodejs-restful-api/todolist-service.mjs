export class TodoListService {
    #todos = ["Belajar Node.js", "Belajar Express.js", "Belajar MongoDB"];

    responseFormatter(res) {
        const body = {
            'status': 200,
            'message': 'success',
            'data': this.#todos.map(function (todo, index) {
                return {
                    'id': index,
                    'todo': todo
                }
            })
        }
        res.write(JSON.stringify(body));
        res.end();
    }

    getTodos(res) {
        return this.responseFormatter(res);
    }

    addTodo(req, res) {
        req.on("data", (data) => {
            const body = JSON.parse(data.toString());
            this.#todos.push(body.todo);
            return this.responseFormatter(res);
        });
    }

    updateTodo(req, res) {
        req.on("data", (data) => {
            const body = JSON.parse(data.toString());
            this.#todos[body.id] = body.todo;
            return this.responseFormatter(res);
        });
    }

    deleteTodo(req, res) {
        req.on("data", (data) => {
            const body = JSON.parse(data.toString());
            const id = body.id;
            this.#todos.splice(id, 1);
            return this.responseFormatter(res);
        });
    }
}

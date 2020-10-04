const input = document.getElementById("input");
const form = document.getElementById("form");
const todosUL = document.getElementById("todos");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        addTodo();
    });
}

// sumbit = enter button
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // calls this function whenever the enter button is pressed
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoElement = document.createElement("li");

        if (todo && todo.completed) {
            todoElement.classList.add("completed");
        }
        todoElement.innerText = todoText;

        // click to mark as complete
        todoElement.addEventListener("click", () => {
            todoElement.classList.toggle("completed");

            updateList();
        });

        // right click to delete
        todoElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoElement.remove();

            updateList();
        });

        todosUL.appendChild(todoElement);

        input.value = "";

    }
}

function updateList() {
    // gets all "li" elements
    const todosElement = document.querySelectorAll("li");

    const todos = [];

    // if a list element in completed store it to local storage
    todosElement.forEach(todoElement => {
        todos.push({
            text: todoElement.innerText,
            completed: todoElement.classList.contains("completed")
        })
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}
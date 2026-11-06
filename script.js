const darkModeButton = document.querySelector("#darkModeButton");


const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todoInput");
const todoListUL = document.querySelector("#todoList");
let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", event => {
    event.preventDefault();

    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    }); 
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" class="checkbox">

        <label for="${todoId}" class="checkbox-circle">
            <i class="iconoir-circle"></i>
            <i class="iconoir-check-circle-solid"></i>
        </label>
        
        <label for="${todoId}" class="todo-text">${todoText}</label>

        <button class="delete-button" id="deleteButton">
            <i class="iconoir-trash"></i>
        </button>
    `;

    const deleteButton = todoLI.querySelector("#deleteButton");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;

    return todoLI;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson)
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";    
    return JSON.parse(todos);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        darkModeButton.innerHTML = `<i class="iconoir-sun-light"></i>`;
    } else {
        localStorage.setItem("theme", "light");
        darkModeButton.innerHTML = `<i class="iconoir-half-moon"></i>`;
    }
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}
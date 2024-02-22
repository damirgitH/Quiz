const todo_title_input = document.getElementById("todo-title-input");
const todo_completed_input = document.getElementById("todo-completed-input");
const todo_add_btn = document.getElementById("todo-add-btn");
const todo_table_body = document.getElementById("todo-table-body");
const clear_all_checkbox = document.getElementById("clear-all-checkbox");

eel.expose
function displayTodo(todo) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = todo['title'];
    let td2 = document.createElement("td");

    // Display Completed value from the second input
    let completedValue = document.createElement("span");
    completedValue.innerText = todo_completed_input.value;
    td2.appendChild(completedValue);

    tr.appendChild(td1);
    tr.appendChild(td2);

    todo_table_body.appendChild(tr);
    todo_title_input.value = "";
    todo_completed_input.value = ""; // Clear completed input
}

eel.expose
function displayAllTodos(todos) {
    for (let todo of todos["todos"]) {
        displayTodo(todo);
    }
}

eel.expose
function clear_all_entries() {
    return eel.clear_all_entries();
}

// Add event listener for the clear-all checkbox
clear_all_checkbox.addEventListener("change", async () => {
    if (clear_all_checkbox.checked) {
        await clear_all_entries()();
        todo_table_body.innerHTML = ""; // Clear the table
        clear_all_checkbox.checked = false; // Reset the checkbox state
    }
});

todo_add_btn.addEventListener("click", (event) => {
    let titleContent = todo_title_input.value;
    let completedContent = todo_completed_input.value;

    if (titleContent !== "" && completedContent !== "") {
        eel.create_todo(titleContent)(displayTodo);
    }
});
//
eel.expose
function displayTodo(todo) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerText = todo['title'];
    let td2 = document.createElement("td");

    // Display Completed value from the second input
    let completedValue = document.createElement("span");
    completedValue.innerText = todo_completed_input.value;
    completedValue.classList.add("blurred");  // Add blurred class

    completedValue.addEventListener("click", function() {
        if (this.classList.contains("blurred")) {
            this.classList.remove("blurred");
        } else {
            this.classList.add("blurred");
        }
    });

    td2.appendChild(completedValue);

    tr.appendChild(td1);
    tr.appendChild(td2);

    todo_table_body.appendChild(tr);
    todo_title_input.value = "";
    todo_completed_input.value = ""; // Clear completed input
}
//
eel.list_todo()(displayAllTodos);

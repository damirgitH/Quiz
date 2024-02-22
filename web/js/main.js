 var x = document.getElementById('login');
    var y = document.getElementById('register');
    var z = document.getElementById('btn');
    function login(){
        x.style.left = "27px";
        y.style.right = "-350px";
        z.style.left = "0px";
    }
    function register(){
        x.style.left = "-350px";
        y.style.right = "25px";
        z.style.left = "150px";
    }
    // View Password codes


    function myLogPassword(){
        var a = document.getElementById("logPassword");
        var b = document.getElementById("eye");
        var c = document.getElementById("eye-slash");
        if(a.type === "password"){
            a.type = "text";
            b.style.opacity = "0";
            c.style.opacity = "1";
        }else{
            a.type = "password";
            b.style.opacity = "1";
            c.style.opacity = "0";
        }
    }
    function myRegPassword(){

        var d = document.getElementById("regPassword");
        var b = document.getElementById("eye-2");
        var c = document.getElementById("eye-slash-2");

        if(d.type === "password"){
            d.type = "text";
            b.style.opacity = "0";
            c.style.opacity = "1";
        }else{
            d.type = "password";
            b.style.opacity = "1";
            c.style.opacity = "0";
        }
    }


const todo_title_input = document.getElementById("todo-title-input");
const todo_add_btn = document.getElementById("todo-add-btn");
const todo_table_body = document.getElementById("todo-table-body");

eel.expose
function displayTodo(todo)
{
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = todo['title'];

    let td2 = document.createElement("td");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("data-id", todo['id']);
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("click", (event) => {

        event.target.setAttribute("disabled", "true");

        let id = event.target.getAttribute("data-id");
        eel.delete_todo(parseInt(id));

        // remove row from table and play animation
        let tr = event.target.parentElement.parentElement;
        $(tr).fadeTo("slow",0.001, function(){
            $(this).remove();
        })

    });

    td2.appendChild(checkbox);
    tr.appendChild(td1);
    tr.appendChild(td2);
    todo_table_body.appendChild(tr);

    todo_title_input.value = "";
}

eel.expose
function displayAllTodos(todos)
{
    for (let todo of todos["todos"])
    {
        displayTodo(todo);
    }
}

todo_add_btn.addEventListener("click", (event) => {
    let content = todo_title_input.value;
    if (content != "")
    {
        eel.create_todo(content)(displayTodo);
    }
})

eel.list_todo()(displayAllTodos)
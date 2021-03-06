//selectors
const todoinput = document.querySelector('.todo-input');
const todobutton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filteroption = document.querySelector('.todo-filter');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todobutton.addEventListener('click', addtodo);
todolist.addEventListener('click', deletechecklist);
filteroption.addEventListener('click', filtertodo);



//fuctions

function addtodo(event) {
    event.preventDefault();
    //div
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo');
    // li 
    const todonew = document.createElement('li');
    todonew.innerHTML = todoinput.value;
    if (todonew.innerHTML.length > 3) {
        todonew.classList.add('todo-item');
        tododiv.appendChild(todonew);
        // local storage
        saveLocalTodos(todoinput.value);
        //completedbutton
        const completedbutton = document.createElement('button');
        // event.preventDefault();
        completedbutton.innerHTML = '<i class= "fas fa-check" ></i>';
        completedbutton.classList.add('complete-btn');
        tododiv.appendChild(completedbutton);
        //trash button 
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class= "fas fa-trash" ></i>';
        trashbutton.classList.add('trash-btn');
        tododiv.appendChild(trashbutton);
        //append to list 
        todolist.appendChild(tododiv);
        //clear input value
        todoinput.value = '';
    }
}

function deletechecklist(event) {
    const item = event.target
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fallback');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filtertodo(e) {
    const todos = todolist.childNodes;
    todos.forEach((todo) => {
        if (todo.classList !== undefined) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = 'flex';
                    }
                    else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = 'flex';
                    }
                    else {
                        todo.style.display = 'none';
                    }
                    break;
                // https://github.com/punith-gowda/simple-Todo
            }
        }
    });
}


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const tododiv = document.createElement('div');
        tododiv.classList.add('todo');
        // li 
        const todonew = document.createElement('li');
        todonew.innerHTML = todo;
        todonew.classList.add('todo-item');
        tododiv.appendChild(todonew);
        //completedbutton
        const completedbutton = document.createElement('button');
        // event.preventDefault();
        completedbutton.innerHTML = '<i class= "fas fa-check" ></i>';
        completedbutton.classList.add('complete-btn');
        tododiv.appendChild(completedbutton);
        //trash button 
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class= "fas fa-trash" ></i>';
        trashbutton.classList.add('trash-btn');
        tododiv.appendChild(trashbutton);
        //append to list 
        todolist.appendChild(tododiv);

    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
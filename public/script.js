const RESPONSE_DONE = 4; //declaration of constants
const STATUS_OK = 200;

//getting all the Elements from the HTML page
const todoListId = 'activeTodoList';
const activeDiv = document.getElementById(todoListId);

const completedTodoListId = 'completedTodoListId';
const completedDiv = document.getElementById(completedTodoListId);

const deletedTodoListId = 'deletedTodoListId';
const deletedDiv = document.getElementById(deletedTodoListId);

//Function: To add elements into the DOM
function addTodoElement(todoJsonData) {
    const todos = JSON.parse(todoJsonData);

    function createTodoElement(id, todoObject) {
        const todoElement = document.createElement('div');

        todoElement.innerText = todoObject.title;
        todoElement.setAttribute('dataId', id);
        todoElement.setAttribute('class', `todoStatus${todoObject.status}`);

        if (todoObject.status === 'Active') {
            const deleteButton = document.createElement('button');
            const label = document.createElement('label');
            const inputCheckBox = document.createElement('input');
            const span = document.createElement('span');

            deleteButton.setAttribute('onclick', `deleteTodoAJAX(${id})`);
            deleteButton.setAttribute('class', 'close color-red');
            deleteButton.innerHTML = '&times';
            todoElement.appendChild(deleteButton);

            label.setAttribute('class', 'custom-control custom-checkbox');
            inputCheckBox.setAttribute('class', 'custom-control-input');
            inputCheckBox.setAttribute('type', 'checkbox');
            inputCheckBox.setAttribute('onclick', `completeTodoAJAX(${id})`);
            span.setAttribute('class', 'custom-control-indicator top-8px');

            label.appendChild(inputCheckBox);
            label.appendChild(span);
            todoElement.insertBefore(label, todoElement.firstChild);
        }

        if (todoObject.status === 'Complete') {
            todoElement.innerText = '';
            const del = document.createElement('del');
            const deleteButton = document.createElement('button');
            const label = document.createElement('label');
            const inputCheckBox = document.createElement('input');
            const span = document.createElement('span');

            del.innerHTML = todoObject.title;
            del.setAttribute('class', 'color-green');
            todoElement.appendChild(del);

            deleteButton.setAttribute('onclick', `deleteTodoAJAX(${id})`);
            deleteButton.setAttribute('class', 'close margin-top-4 color-red');
            deleteButton.innerHTML = '&times';
            todoElement.appendChild(deleteButton);

            label.setAttribute('class', 'custom-control custom-checkbox top-8px');
            inputCheckBox.setAttribute('class', 'custom-control-input');
            inputCheckBox.setAttribute('type', 'checkbox');
            inputCheckBox.setAttribute('onclick', `activeTodoAJAX(${id})`);
            inputCheckBox.setAttribute('checked', 'checked');
            span.setAttribute('class', 'custom-control-indicator');

            label.appendChild(inputCheckBox);
            label.appendChild(span);
            todoElement.insertBefore(label, todoElement.firstChild);
        }

        if (todoObject.status === 'Deleted') {
            todoElement.innerText = '';
            const del = document.createElement('del');

            del.innerHTML = todoObject.title;
            del.setAttribute('class', 'color-red');

            todoElement.appendChild(del);
        }

        return todoElement;
    }

    activeDiv.innerHTML = '';
    deletedDiv.innerHTML = '';
    completedDiv.innerHTML = '';

    Object.keys(todos).forEach(
         (key) => {
            const todoElement = createTodoElement(key, todos[key]);
            if (todos[key].status === 'Active') {
                activeDiv.appendChild(todoElement);
            } else if (todos[key].status === 'Deleted') {
                deletedDiv.appendChild(todoElement);
            } else {
                completedDiv.appendChild(todoElement);
            }
        }
    );
}

// Function: To get all the TODOS
function getTodosAJAX() {
    const xhr = new XMLHttpRequest();
    const data = null;
    xhr.open('GET', '/api/todos', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.responseText);
                addTodoElement(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}

//Function to change from active todo to complete todo
function completeTodoAJAX(todoId) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/api/todos/${todoId}`, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const data = 'status=Complete';
    xhr.onreadystatechange = () => {
        'use strict';
        if (xhr.readyState === RESPONSE_DONE) {
           if (xhr.status === STATUS_OK) {
              console.log(xhr.response);
              addTodoElement(xhr.responseText);
           } else {
               console.log('Error');
           }
        }
    };
    xhr.send(data);
}

//function to convert completed to active again
function activeTodoAJAX(todoId) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/api/todos/${todoId}`, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const data = 'status=Active';
    xhr.onreadystatechange = () => {
        'use strict';
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.response);
                addTodoElement(xhr.responseText);
            } else {
                console.log('Error');
            }
        }
    };
    xhr.send(data);
}

//Post method call
function addTodoAJAX() {
    const newTodoTitle = document.getElementById('NEW_TODO_INPUT_ID').value;
    //for removing the written material from the input
    document.getElementById('NEW_TODO_INPUT_ID').value = '';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/todos', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //encoding because spaces are not send as spaces
    const data = `title= ${encodeURI(newTodoTitle)}`;
    xhr.onreadystatechange = () => {
        'use strict';
        if (xhr.readyState === RESPONSE_DONE) {
           if (xhr.status === STATUS_OK) {
               addTodoElement(xhr.responseText);
           } else {
               console.log(xhr.responseText);
               console.log('error');
           }
        }
    };
    xhr.send(data);
}

//delete todo AJAX function
function deleteTodoAJAX(todoId) {
    const xhr = new XMLHttpRequest();
    const data = null;
    xhr.open('DELETE', `/api/todos/${todoId}`, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        'use strict';
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                addTodoElement(xhr.responseText);
            } else {
                console.log(xhr.responseText);
                console.log('error');
            }
        }
    };
    xhr.send(data);
}

//once the window loads, it automatically loads the previous list
window.onload = getTodosAJAX();

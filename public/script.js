const RESPONSE_DONE = 4;
const STATUS_OK = 200;

const todoListId = 'activeTodoList';
const activeDiv = document.getElementById(todoListId);

const completedTodoListId = 'completedTodoListId';
const completedDiv = document.getElementById(completedTodoListId);

const deletedTodoListId = 'deletedTodoListId';
const deletedDiv = document.getElementById(deletedTodoListId);

function addTodoElement(todoJsonData) {
    const todos = JSON.parse(todoJsonData);
    function createTodoElement(id, todoObject) {
        const todoElement = document.createElement('div');

        todoElement.innerText = todoObject.title;
        todoElement.setAttribute('dataId', id);
        todoElement.setAttribute('class', 'todoStatus' + todoObject.status);
        if (todoObject.status === 'Active') {
            const completeButton = document.createElement('button');
            completeButton.innerText = 'Mark as Complete';
            completeButton.setAttribute('onclick', 'deteleTodoAJAX(' + id + ')');
             completeButton.setAttribute('class', 'close');
            completeButton.innerHTML = '&times';
            todoElement.appendChild(completeButton);

            const inputCheckBox = document.createElement('input');
            inputCheckBox.setAttribute('class', 'btn btn-success');
            inputCheckBox.setAttribute('type', 'checkbox');
            inputCheckBox.setAttribute('onclick', 'completeTodoAJAX(' + id + ')');
            todoElement.insertBefore(inputCheckBox, todoElement.firstChild);
        }
        if (todoObject.status === 'Deleted') {}

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

function getTodosAJAX() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/todos', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.responseText);
                addTodoElement(xhr.responseText);
            }
        }
    };
    xhr.send(data = null);
}

function completeTodoAJAX(todoId) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/todos/' + todoId, true);
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

function addTodoAJAX() {
    const newTodoTitle = document.getElementById('NEW_TODO_INPUT_ID').value;
    document.getElementById('NEW_TODO_INPUT_ID').value = '';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/todos', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const data = 'title=' + encodeURI(newTodoTitle);
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

function deteleTodoAJAX(todoId) {
    const xhr = new XMLHttpRequest();
    const data = null;
    xhr.open('DELETE', '/api/todos/' + todoId, true);
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

window.onload = getTodosAJAX();

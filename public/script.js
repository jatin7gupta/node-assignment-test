const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const todoListId = 'todos_list_div';

function addTodoElement(id, todoJsonData) {
    const parent = document.getElementById(id);

    let todos = JSON.parse(todoJsonData);
    function createTodoElement(id, todoObject) {
        const todoElement = document.createElement('div');
        todoElement.innerText = todoObject.title;
        todoElement.setAttribute('dataId', id);
        todoElement.setAttribute('class', 'todoStatus'+todoObject.status);

        if (todoObject.status === 'Active') {
            const completeButton = document.createElement('button');
            completeButton.innerText = 'Mark as Complete';
            completeButton.setAttribute('onclick', 'completeTodoAJAX('+id+')');
            completeButton.setAttribute('class','btn btn-outline-primary btn-sm');
            todoElement.appendChild(completeButton);
        }
        return todoElement;
    }

    if (parent) {
        parent.innerText = '';
        Object.keys(todos).forEach(
            function (key) {
                let todoElement = createTodoElement(key ,todos[key]);
                parent.appendChild(todoElement);
            }
        )
    }
}

function getTodosAJAX() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/todos', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.responseText);
                addTodoElement(todoListId, xhr.responseText);
            }
        }
    };
    xhr.send(data = null);
}

window.onload = getTodosAJAX();
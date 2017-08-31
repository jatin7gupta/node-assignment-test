const RESPONSE_DONE = 4;
const STATUS_OK = 200;

const todoListId = 'activeTodoList';
const activeDiv = document.getElementById(todoListId);

const completedTodoListId = 'completedTodoListId';
const completedDiv = document.getElementById(completedTodoListId);

const deletedTodoListId = 'deletedTodoListId';
const deletedDiv = document.getElementById(deletedTodoListId);

function addTodoElement( todoJsonData) {


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
             completeButton.setAttribute('class','close');
            completeButton.innerHTML = '&times';
            todoElement.appendChild(completeButton);

            const inputCheckBox = document.createElement('input');
            inputCheckBox.setAttribute('class', 'btn btn-success');
            inputCheckBox.setAttribute('type', 'checkbox');
            inputCheckBox.setAttribute('onclick', 'completeTodoAJAX('+id+')');
            todoElement.insertBefore(inputCheckBox,todoElement.firstChild);
        }
        if(todoObject.status === 'Deleted'){

        }

        return todoElement;
    }

    //if (activeDiv) {
        //activeDiv.innerText = '';
        Object.keys(todos).forEach(
            function (key) {
                let todoElement = createTodoElement(key ,todos[key]);
                if (todos[key].status === 'Active') {
                    activeDiv.appendChild(todoElement);
                } else if (todos[key].status === 'Deleted') {
                    deletedDiv.appendChild(todoElement);
                }
                else{
                    completedDiv.appendChild(todoElement);
                }

            }
        )
   // }
}

function getTodosAJAX() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/todos', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.responseText);
                addTodoElement( xhr.responseText);
            }
        }
    };
    xhr.send(data = null);
}

window.onload = getTodosAJAX();
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const todoListId = 'todos_list_div';
const list = document.getElementById(todoListId);


function addTodoElement(todoJsonData) {
    list.innerText += todoJsonData;
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

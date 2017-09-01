
const statusEnum = {
    Active: 'Active',
    Complete: 'Complete',
    Deleted: 'Deleted'
};

let todoDB = {
    1: { title: 'todo 1', status: statusEnum.Active },
    2: { title: 'todo 2', status: statusEnum.Active },
    3: { title: 'todo 3', status: statusEnum.Deleted }
};

let nextTodo = 4;


module.exports = {
    DB: todoDB,
    nextTodoID: nextTodo,
    status: statusEnum

};


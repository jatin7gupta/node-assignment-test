const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const db = require('./seed');

const path = require('path');

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    next();
});

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/api/todos/:status', (req, res) => {
    'use strict';
    const status = req.params.status;
    if (status === 'Active') {
        const activeTodos = {};
        for (const key of Object.keys(db.DB)) {
            if (db.DB[key].status === 'Active') {
                activeTodos[key] = db.DB[key];
            }
        }
        res.json(activeTodos);
    }
    if (status === 'Complete') {
        const completeTodos = {};
        for (const key of Object.keys(db.DB)) {
            if (db.DB[key].status === 'Complete') {
                completeTodos[key] = db.DB[key];
            }
        }
        res.json(completeTodos);
    }
    if (status === 'Deleted') {
        const deletedTodos = {};
        for (const key of Object.keys(db.DB)) {
            if (db.DB[key].status === 'Deleted') {
                deletedTodos[key] = db.DB[key];
            }
        }
        res.json(deletedTodos);
    } else {
        res.json('Invalid Request', 400);
    }
});

app.get('/api/todos', (req, res) => {
    'use strict';
    res.json(db.DB);
});

app.delete('/api/todos/:id', (req, res) => {
   const id = req.params.id;
   if (id === undefined) {
       res.send('Empty id', 400);
   } else {
       const todoToBeDeleted = db.DB[id];
       if (todoToBeDeleted === undefined) {
           res.send('Wrong id', 400);
       } else {
           db.DB[id].status = db.status.Deleted;
           res.json(db.DB[id]);
       }
   }
});

app.use('/', bodyParser.urlencoded({ extended: false }));

app.post('/api/todos', (req, res) => {
    'use strict';
    const todoTitle = req.body.title;
    if (todoTitle === undefined) {
        res.json('Invalid title', 400);
    }
    if (todoTitle === '' || todoTitle.trim() === '') {
        res.json('Invalid title', 400);
    } else {
        db.DB[db.nextTodoID] = {
            title: req.body.title,
            status: db.status.Active
        };
        db.nextTodoID += 1;
        res.send('Successfully added');
    }
});

app.put('/api/todos/:id', (req, res) => {
    'use strict';
    const modId = req.params.id;
    const todo = db.DB[modId];
    if (todo === undefined) {
        res.json('Invalid Todo value', 400);
    } else {
        const title = req.body.title;
        if (title && todo !== '' && title.trim() !== '') {
            todo.title = title;
        }
        const todoStatus = req.body.status;
        if (todoStatus && (todoStatus === db.status.Active || todoStatus === db.status.Complete)) {
            todo.status = todoStatus;
        }
        res.json(todo);
    }
});


app.put('/api/todos/:status/:id', (req, res) => {
    'use strict';
    const modId = req.params.id;
    const todo = db.DB[modId];
    const status = req.params.status;
    if (todo === undefined) {
        res.json('Invalid Todo value', 400);
    }
    if (status === 'Active') {
        db.DB[modId].status = db.status.Active;
        res.json(todo);
    } else if (status === 'Complete') {
        db.DB[modId].status = db.status.Complete;
        res.json(todo);
    } else {
        res.json('Invalid Status', 400);
    }
});

app.get('/', (req, res) => {
   res.send('Hello world');
});

app.listen(3000);

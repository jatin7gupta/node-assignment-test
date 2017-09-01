const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const db = require('./seed');

const path = require('path');

//Middleware : Logs file
app.use((req, res, next) => {
    'use strict';
    console.log(req.url);
    console.log(req.method);
    next();
});

//Middleware : access files in public folder
app.use('/', express.static(path.join(__dirname, '/public')));

//Middleware : GET todos with requested 'status'
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
        res.status(400).json('Invalid Request');
    }
});

//Middleware : GET todos
app.get('/api/todos', (req, res) => {
    'use strict';
    res.json(db.DB);
});

//Middleware : DELETE todos with the requested id
app.delete('/api/todos/:id', (req, res) => {
    'use strict';

   const id = req.params.id;

   if (id === undefined) {
       res.status(400).json('Empty ID');
   } else {
       const todoToBeDeleted = db.DB[id];
       if (todoToBeDeleted === undefined) {
           res.status(400).json('Invalid ID');
       } else {
           db.DB[id].status = db.status.Deleted;
           res.json(db.DB);
       }
   }
});

//Middleware: Parsing body of POST request
app.use('/', bodyParser.urlencoded({ extended: false }));

//Middleware: POST request for adding todo
app.post('/api/todos', (req, res) => {
    'use strict';

    const todoTitle = req.body.title;

    if (todoTitle === undefined) {
        res.json('Invalid title', 400);
    }

    if (todoTitle === '' || todoTitle.trim() === '') {
        res.status(400).json('Invalid title');
    } else {
        db.DB[db.nextTodoID] = {
            title: req.body.title,
            status: db.status.Active
        };

    db.nextTodoID += 1; //increment next counter for the next TODO
    res.send(db.DB);
    }
});

//Middleware: Put Request for Requested ID
app.put('/api/todos/:id', (req, res) => {
    'use strict';
    const modId = req.params.id;
    const todo = db.DB[modId];
    if (todo === undefined) {
        res.status(400).json('Invalid Todo value');
    } else {
        const title = req.body.title;
        if (title && todo !== '' && title.trim() !== '') {
            todo.title = title;
        }
        const todoStatus = req.body.status;
        if (todoStatus && (todoStatus === db.status.Active || todoStatus === db.status.Complete)) {
            todo.status = todoStatus;
        }
        res.json(db.DB);
    }
});

//Middleware: Change the requested 'status' to the requested 'id'
app.put('/api/todos/:status/:id', (req, res) => {
    'use strict';
    const modId = req.params.id;
    const todo = db.DB[modId];
    const status = req.params.status;
    if (todo === undefined) {
        res.status(400).json('Invalid Request');
    }

    if (status === 'Active') {
        db.DB[modId].status = db.status.Active;
        res.json(db.DB);
    } else if (status === 'Complete') {
        db.DB[modId].status = db.status.Complete;
        res.json(db.DB);
    } else {
        res.status(400).json('Invalid Request');
    }
});

app.listen(4000);

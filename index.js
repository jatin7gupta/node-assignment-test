const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const db = require('./seed');

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    next();
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
        const newTodoObject = {
            title: req.body.title,
            status: db.status.Active
        };
        db.DB[db.nextTodoID] = newTodoObject;
        db.nextTodoID += 1;
        res.send('Successfully added');
    }
});

app.get('/', (req, res) => {
   res.send('Hello world');
});

app.listen(3000);

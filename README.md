# Node Todo app Nagarro August 2017

This app was made to learn different aspect of Node, Express and some HTML and CSS.

<p align="center">
<a href="http://tinypic.com?ref=qq1ely" target="_blank"><img src="http://i65.tinypic.com/qq1ely.png" border="0" alt="Image and video hosting by TinyPic"></a>
</p>

## Getting Started

* To install type "npm install" to install all the dependencies.
* Type "node index.js" to run the app.
* Find the UI at "http://localhost:4000/"

## Using API's

*  GET /api/todos
        
        Initial seed
        {
            "1":{"title":"todo 1","status":"Active"},
            "2":{"title":"todo 2","status":"Active"},
            "3":{"title":"todo 3","status":"Deleted"}
        }
        Status options :-
                Active
                Complete
                Deleted
        
*  POST /api/todos

        In JSON body send, and status will be set to Active
  
        { "title": "Todo Title" }
        
*  PUT /api/todos/:id
        
        In JSON body (optional)
        { 
            "title" : "Suitable title",
            "status" : "Active/Complete/Deleted"
        }
        

*  DELETE /api/todos:id

All API's respond with the complete set of Todos as the response of the request.

## Additional API's

* GET /api/todos/Active - will provide all the Active Todos.
* GET /api/todos/Complete - will provide all the Complete Todos.
* GET /api/todos/Deleted - will provide all the Deleted Todos.
* PUT /api/todos/Complete/:id - will mark the status as Complete of the todo with the requested id.
* PUT /api/todos/Active/:id - will mark the status as Active of the todo with the requested id.

### Prerequisites

* Node
* Browser

## Features Built

* Active Todos : This section displays all active todos. Clicking the checkbox completes the todo. Clicking the red X deletes the todo.
* Add Todo : This section lets you add a todo (with status Active).
* Completed Todos : This section displays completed todos. Clicking the checkbox makes the todo active (again). Clicking the red X deletes the todo.
* Deleted Todos : Displays list of deleted todos.
* Used some design principles in UI making, like suitable color choice etc.

## Features Not Built
* Implemented all the features as suggested by the instruction document.

## Known Issues
* If we type a multi line TODO, then the delete button goes at the end of the TODO.
* Todo doesn't maintain time stamps.

## Built With

* [Node](https://nodejs.org/en/) - The BackEnd
* [Nodemon](https://www.npmjs.com/package/nodemon) - Auto Reload
* [Bootstrap](http://getbootstrap.com/) - CSS and UI elements




## Authors

* **Jatin Gupta**  - [GitHub](https://github.com/jatin7gupta)

## License

This project is licensed under the MIT License.

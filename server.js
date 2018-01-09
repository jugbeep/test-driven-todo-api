// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/
let currentIds = 3;
// our database is an array for now with some hardcoded values
let todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
  // res.json({todos}); c
});

/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

// app.get('/api/todos/search', function search(req, res) {
//    This endpoint responds with the search results from the
//    * query in the request. COMPLETE THIS ENDPOINT LAST.
   
// });

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
  res.json({todos});
}); 

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */
  currentIds++;

  let newTodo = req.body;
  newTodo._id = currentIds

  todos.push(newTodo);
  console.log('posed a todo')
  console.log(todos);
  res.send(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */


  /////this works but is throwing and error. very annoying//////
  foundId =  parseInt(req.params.id);
  
  let find = todos.filter(function (id) {
      return id._id == foundId;
  })[0];

  res.json(find);
  /////this works but is throwing and error. very annoying/////


  let searchParams = req.params;
  console.log(searchParams);
  
  getById(todos, searchParams);

  function getById(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].b === value) return arr[i];
      console.log(arr[i]);
    }
  }

});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  let foundId = Number(req.params.id);

  if(!req.body.task || !req.body.description) {
    res.send('Fill out the both fields');

  } else 
    req.body.id = foundId;
    let newTodo = todos.find(function(todos) {
      return todos._id === Number(req.params.id);
    });

  newTodo.task = req.body.task;

  newTodo.description = req.body.description;

  res.json(newTodo);

  })


app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
   remove = Number(req.params.id);
   popIt = todos.splice( (remove -1), 1); ;
 
   res.json({remove});
   
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});

// module.exports = {
//    app.get: app.get,
// }


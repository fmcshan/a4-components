const express  = require( 'express' ),
      app      = express()

const todos = []

app.use( express.json() )
app.use( express.static( 'dist' ) )
app.use( express.static( 'src' ) )

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  if (req.body.priority == 'Yes') {
    req.body.dueDate = '1 day'
  } else {
    req.body.dueDate = '2 days'
  }
  todos.push( req.body )
  res.json( todos )
})

app.post( '/delete', ( req,res ) => {
  todos.forEach( (item, i) => {
    if (i === req.body.id) {
      todos.splice(i, 1)
    }
  })
  res.json(todos)
})

app.listen( 8080 )
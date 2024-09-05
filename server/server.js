const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

const guesses = [];
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
app.post('/guess', (req, res) => {
  console.log(req.body);
  if (Object.keys(req.body).length === 0 || 
!req.body.player || 
!req.body.guess) {
  res.sendStatus(500)
} else {
  guesses.push(req.body) 
  res.sendStatus(201);
}

})
app.get('/guess/answer', (req, res) => {
  console.log('sending answer');
  res.send(guesses);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

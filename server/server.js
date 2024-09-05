const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let random = Math.floor(Math.random() * 25 + 1 );
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
!req.body.player1 || 
!req.body.player2 || 
!req.body.player3 ) {
  res.sendStatus(500)
} else {
  guesses.push(req.body) 
  res.sendStatus(201);
}

})

app.get('/guess/answer', (req, res) => {
  let guessObj = guesses[guesses.length-1];
  console.log('sending answer');
  console.log('random num :', random);
  let guesses2 = {
    player1: 'guess',
    player2: 'guess',
    player3: 'guess'
  }
  
  if(guessObj.player1 > random){
    guesses2.player1 = 'high';
  } else if 
    (guessObj.player1 === random){
      guesses2.player1 = 'correct';

  } else{
    guesses2.player1 = 'low';
  }
  if(guessObj.player2 > random){
    guesses2.player2 = 'high';
  } else if 
    (guessObj.player2 === random){
      guesses2.player2 = 'correct';

  } else{
    guesses2.player2 = 'low';
  }
  if(guessObj.player3 > random){
    guesses2.player3 = 'high';
  } else if 
    (guessObj.player3 === random){
      guesses2.player3 = 'correct';

  } else{
    guesses2.player3 = 'low';
  }
  res.send(guesses2);
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

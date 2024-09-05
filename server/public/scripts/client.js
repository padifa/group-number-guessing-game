function onReady() {
  console.log("JavaScript is loaded!")

}
function fetchAnswers (event){
event.preventDefault();
axios({
  method: "POST",
  url: "/guess",
  data : {
    player1 : document.getElementById("player1").value,
    player2 : document.getElementById("player2").value,
    player3 : document.getElementById("player3").value
  }
}).then(function (response){
console.log(response)})
.catch(function (error) {
  console.log(error);
  alert(`Hey it's not working, do something else` );
})

axios({
  method: "GET",
  url: "/guess/answer",
})
.then(function(response) {
  console.log(response);
const guessObj = response.data;
const playerTable = document.getElementById("answers");

  playerTable.innerHTML += `
  <tr>
    <td>player 1</td>
    <td>player 2</td>
    <td>player 3</td>
  </tr>
  <tr>
  <td>${guessObj.player1}</td>
  <td>${guessObj.player2}</td>
  <td>${guessObj.player3}</td>
  </tr>
  `


})

}
onReady()
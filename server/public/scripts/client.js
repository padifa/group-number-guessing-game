function onReady() {
  console.log("JavaScript is loaded!");
}
let num = 0;
function fetchAnswers(event) {
  event.preventDefault();
  num++;
  document.getElementById("counter").innerHTML = `
  Total guesses: ${num}
  `;
  axios({
    method: "POST",
    url: "/guess",
    data: {
      player1: document.getElementById("player1").value,
      player2: document.getElementById("player2").value,
      player3: document.getElementById("player3").value,
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      alert(`Hey it's not working, do something else`);
    });

  axios({
    method: "GET",
    url: "/guess/answer",
  }).then(function (response) {
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
  `;
    if (
      guessObj.player1 === "correct" ||
      guessObj.player2 === "correct" ||
      guessObj.player3 === "correct"
    ) {
      const resetDiv = document.getElementById("resetButton");
      const resetButton = document.createElement("button");
      resetButton.textContent = "Reset Button";
      resetButton.addEventListener("click", reset);
      resetDiv.appendChild(resetButton);
      document.getElementById("submit-button").setAttribute("disabled", true);
    }
  });
}
function reset() {
  axios({
    method: "GET",
    url: "/random",
  })
    .then(function (response) {
      window.location.reload();
    })
    .catch((error) => {
      console.error(error, "error resetting");
    });
}
onReady();

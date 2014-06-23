
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var gameWon = false;
var p1wins = 0;
var p2wins = 0;

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var gameReset = function (){
  if(gameWon === true){
    // location.reload();
  }
}

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    // TODO: Check for rest of game winning cases
  )
  {
    console.log('somebody won');
    $(document).trigger('game-win', currentPlayer);
  }
};

$(document).on('click', '#board .space', function (e) {
  if(gameWon){
    alert("Game over");
    return;
  }
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  // Marks the space with the current player's name
  if(spaces[spaceNum]){
    alert("This space is already taken");
    return false;
  }else{
    spaces[spaceNum] = currentPlayer;
  }

  // Adds a class to elem so css can take care of the visuals
  $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);
  checkForWinner();
  setNextTurn();
});

$(document).on('game-win', function (e, winner) {
  e.preventDefault();
  $("#put-winner").text("Congratulations! " + winner + " won the game!!");
  gameWon = true;
  if (winner == player1){
    p1wins = p1wins += 1;
    alert(p1wins);
  }else{
    p2wins = p2wins += 1;
    alert(p2wins);
  }
  gameReset();
});

$('button').on('click', function(e){
  e.preventDefault;
  location.reload();
});

// Start the game
setNextTurn();

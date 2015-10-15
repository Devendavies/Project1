(function Game () {
console.log('js is working');
// Variable declarations
var turn = 0, // Tracks who's turn it is
    win = false, // True if win condition met
    lastTurn = 0; // Tracks last person to roll

// Player object definitions
var cop1 = {
  id: 'c1',
  score: 75,
  lastRoll: null,
  initialRoll: true
};

var cop2 = {
  id: 'c2',
  score: 75,
  lastRoll: null,
  initialRoll: true
};

var robber1 = {
  id: 'r1',
  score: 64,
  lastRoll: null,
  initialRoll: true
};

var robber2 = {
  id:'r2',
  score:66,
  lastRoll:null,
  initialRoll:true
};

var players = [cop1, robber1, cop2, robber2];

// FUNCTION DEFINITIONS

// Game Setup
var setUp = function(){
    for (var i = 0; i < players.length; i++) {
      scoreRollUpdate(players[i]);
    }
};

// Update the display of a players score and last roll
var scoreRollUpdate = function(player){
  $('#' + player.id + '> .score').html('Meters from the river: ' + player.score);
  if (player.initialRoll = true){
  $('#' + player.id + '> .lastRoll').html('Last Dash: ' + players.lastRoll);
  }
};

// Roll effects
var rollEffects(player, roll){
  switch (roll) {
    case 1:
    case 2:
    case 3:
      player.score -= 1;
      break;
      turn += 1;
    case 4:
      player.score -= 2;
      turn += 3;
      break;
    case 5:
      player.score -= 2;
      turn += 2;
      break;
    case 6:
      if(player.initialRoll = true){ // Check if first roll this turn                   // Gives same player another roll
        player.score -= 1;
      } else {
        player.score -= 2;
        player.initialRoll = true;
        turn += 1;
      }
      break;
    default: console.log('Roll error');
  }
}

// Random Dice Roll
var getRoll (){
  return Math.ceil(Math.random()*6);
}

// Unique First Round
var firstRound = function(){
  turn = Math.ceil(Math.random()*4); // Can be improved to actually see 4 rolls later
  roll = getRoll();                  // Bonus roll
  if (roll === 1 || roll === 2 || roll ===3){
    player.score -= 1;
  } else {
    player.score -= 2;
  }

  // moveFeed(player[turn%5].id + 'has won the roll with a ')
}



// ALL THE JAVASCRIPT IS BELONG TO US!

var startGame = function (){
  setUp();
  firstRound();



};

startGame();

}());


// Re-Vamped functions

// var scoreRollUpdate = function(players){
//   for (var i = 0; i < players.length; i++) {
//     $('.player > .score').eq(i).html('Meters from the river: ' + players[i].score);
//     $('.players > .lastRoll').eq(i).html('Last Dash: ' + players[i].lastRoll);
//   }
// };

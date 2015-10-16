// (function Game () {
console.log('js is working');

// Variable declarations
var turn = 0, // Tracks who's turn it is
    win = false, // True if win condition met
    lastTurn = 0, // Tracks last person to roll
    winners = 'none'; // The winners

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
  id: 'r2',
  score: 66,
  lastRoll: null,
  initialRoll: true
};

var players = [cop1, robber1, cop2, robber2];

// FUNCTION DEFINITIONS

// Game Setup
var setUp = function(players, turn){
    for (var i = 0; i < players.length; i++) {
      scoreRollUpdate(players[i]);
      showButton(turn);
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
var rollEffects = function(player, roll){
  player.lastRoll = roll;
  switch (roll) {
    case 1:
    case 2:
    case 3:
      player.score -= 1;
      turn += 1;
      break;
    case 4:
      player.score -= 2;
      if(player.initialRoll = true){
        turn += 3;
      }
      break;
    case 5:
      player.score -= 2;
      if(player.initialRoll = true){
        turn += 2;
      }
      break;
    case 6:
      if(player.initialRoll = true){ // Check if first roll this turn                   // Gives same player another roll
        player.score -= 1;
        player.initialRoll = false;
      } else {
        player.score -= 2;
        player.initialRoll = true;
        turn += 1;
      }
      break;
    default: console.log('Roll error');
  }
};

// Random Dice Roll
var getRoll = function(){
  return Math.ceil(Math.random()*6);
};

// Unique First Round
var firstRound = function(players, turn){
  turn = Math.floor(Math.random()*4); // Can be improved to actually see 4 rolls later
  roll = getRoll();                  // Bonus roll
  players[turn].score -= roll;
  // moveFeed(player[turn%5].id + 'has won the roll with a ' + roll)
  console.log(players[turn].id + ' has rolled a ' + roll);
};

// Hide a button
var hideButton = function(lastTurn){
  $('#button' + (lastTurn%4 + 1)).css('display', 'none');
};

// Show a button
var showButton = function(turn){
  $('#button' + (turn%4 + 1)).css('display', '');
}

//
var winCheck = function(players, winners){
  if ((players[0].score <= players[1]) ||
      (players[0].score <= players[3]) ||
      (players[2].score <= players[1]) ||
      (players[2].score <= players[3])) {
    winners = 'cops';
    win = true;
  } else if ((players[1].score <= 0) && (players[3].score <= 0)){
    winners = 'robbers';
    win = true;
  } else { return null; }
}

var winMessage = function(winners){
  if(winners == 'cops'){
    console.log('cops have won goes here');
  } else if(winners == 'robbers'){
    console.log('robbers have won goes here');
  } else {
    console.log('winCheck error');
  }
}

// Check for a roll that causes a missed turn
var missCheck = function(players, roll, lastTurn){
  if (players[lastTurn].lastRoll == roll){
    turn++;
    return true;
  } else { return false; }
};

// Normal player/dice effects
var myTurn = function(turn, roll, players, lastTurn){
  missCheck(players, turn, lastTurn);
  rollEffects(players[turn], roll);
  scoreRollUpdate(players[turn]);
};

// Normal Rounds
var normalRound = function(roll, turn, lastTurn, players, winners){
  roll = getRoll(); // Shove to appropriate HTML element
  myTurn(turn, roll, players, lastTurn);
  // Checks for bonus roll
  if(roll === 6){
    roll = getRoll();
    myTurn(turn, roll, players);
  }
  // Post turn checks
  players[turn].lastRoll = roll;
  winCheck(players, winners);
  hideButton(lastTurn);
  showButton(turn);
  if(win === true){
    winMessage(winners);
  }
};

// MAIN
var startGame = function (){
  setUp(players, turn);
  firstRound(players, turn);
  $('.button').click(function(){
    normalRound(roll, turn, lastTurn, players, winners);
  });
};

startGame();

//}()); //MODULE ENDING

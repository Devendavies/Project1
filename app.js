(function Game () {

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
var scoreRollUpdate = function(players){
    $('.player').each($('.score')) = players[i].score;
    $('.players').each($('lastRoll')) = players[i].lastRoll;
};

// ALL THE JAVASCRIPT IS BELONG TO US!




}());

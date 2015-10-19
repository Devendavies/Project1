// (function Game () {
console.log('js is working');

// Variable declarations
var changes,
    turn = 0, // Tracks who's turn it is
    lastTurn = 0, // Tracks last person to roll
    winners = null; // The winners

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
  for (var i = 0; i < 4; i++) {
    updateScores(players[i]);
    hideButton(i);
  }
  // showButton(turn);
};

// Update the display of a players score and last roll
var updateScores = function(player){
  $('#' + player.id + '> .score').html('Meters from the river: ' + player.score);
  if (player.initialRoll = true){
  $('#' + player.id + '> .lastRoll').html('Last Dash: ' + players.lastRoll);
  }
};

// Roll effects
var rollEffects = function(player, roll, turn){
  switch (roll) {
    case 1:
    case 2:
    case 3:
      player.score -= 1;
      console.log(player.id + ' loses 1 point\n');
      console.log((player.score + 1) + ' >> ' + player.score);
      break;
    case 4:
      player.score -= 2;
      console.log(player.id + ' loses 2 points\n');
      console.log((player.score + 2) + ' >> ' + player.score);
      if(player.initialRoll == true){
        turn += 2;
      }
      break;
    case 5:
      player.score -= 2;
      console.log(player.id + ' loses 2 points\n');
      console.log((player.score + 2) + ' >> ' + player.score);
      if(player.initialRoll == true){
        turn += 1;
      }
      break;
    case 6:
      if(player.initialRoll == true){ // Check if first roll this turn                   // Gives same player another roll
        player.score -= 1;
        console.log(player.id + ' loses 1 points and gets to roll again!\n');
        console.log((player.score + 1) + ' >> ' + player.score);
        player.initialRoll = false;
      } else {
        player.score -= 2;
        console.log(player.id + ' loses 2 points!\n');
        console.log((player.score + 2) + ' >> ' + player.score);
        player.initialRoll = true;
      }
      break;
    default: console.log('Roll error');
  }
  return turn;
};

// Random Dice Roll
var getRoll = function(){
  return Math.ceil(Math.random()*6);
};

// Unique First Round
var firstRound = function(players, turn){
  turn = Math.floor(Math.random()*4); // Can be improved to actually see 4 rolls later
  roll = getRoll();                  // Bonus roll
  players[turn%4].score -= roll;
  // moveFeed(player[turn%5].id + 'has won the roll with a ' + roll)
  console.log(players[turn%4].id + ' has rolled a ' + roll);
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
var winCheck = function(players){
  if ((players[0].score <= players[1].score) ||
      (players[0].score <= players[3].score) ||
      (players[2].score <= players[1].score) ||
      (players[2].score <= players[3].score)) {
    return 'cops';
  } else if ((players[1].score <= 0) && (players[3].score <= 0)){
    return 'robbers';
  } else { return null; }
}

var winMessage = function(winners){
  if(winners == 'cops'){
    console.log('cops have won goes here');
  } else if(winners == 'robbers'){
    console.log('robbers have won goes here');
  } else if(winners == null){
    console.log('winCheck error, shouldn\'t be showing...');
  }
}

// Check for a roll that causes a missed turn
var missCheck = function(players, roll, lastTurn){
  if (players[lastTurn%4].lastRoll == roll){
    return true;
  } else { return false; }
};

// Normal Rounds
var normalRound = function(players, turn, winners, lastTurn){
  roll = getRoll(); // Shove to appropriate HTML element
  if (missCheck(players, roll, lastTurn) == false){
    console.log(players[turn%4].id + ' has rolled a ' + roll);
    players[turn%4].lastRoll = roll;
    turn = rollEffects(players[turn%4], roll, turn);
    lastTurn = turn;
    updateScores(players[turn%4]);
    // Checks for bonus roll
    if(roll === 6){
      roll = getRoll();
      players[turn%4].lastRoll = roll;
      turn = rollEffects(players[turn%4], roll, turn);
      lastTurn = turn;
      updateScores(players[turn%4]);
    }
  } else { console.log(players[turn%4].id + ' has rolled a ' + roll);
           console.log('\nSadly... so did ' + players[lastTurn%4].id);
           console.log(' and thus loses his turn due to being a copycat... ');
         }

  turn++;
  console.log('Turn = ' + turn);

  // Toggle button to next player
  showButton(turn);
  hideButton(lastTurn);

  // Post turn checks
  winners = winCheck(players);

  if(winners != null){
    winMessage(winners);
  }

  return [turn, lastTurn, winners];
};

// First Round Pass
var startGame = function (){
  setUp(players, turn);
  firstRound(players, turn);
  showButton(turn);
  updateScores(players[turn%4]);
};

  showButton(0);

  // $('#button').click(function(){
  startGame();
  // });

  $('.button').click(function(){
    changes = normalRound(players, turn, winners, lastTurn);
    turn = changes[0];
    lastTurn = changes[1];
    winners = changes[2];
  });

//}()); //MODULE ENDING

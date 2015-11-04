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
var setUp = function(){
  for (var i = 0; i < players.length; i++) {
    updateScores(players[i]);
    hideButton(i + 1);
  }
  // showButton(turn);
};

// Update the display of a players score and last roll
var updateScores = function(){
  $('#' + players[turn%4].id + '> .score').html('Meters from the river: ' + players[turn%4].score);
  if (players[turn%4].initialRoll = true){
  $('#' + players[turn%4].id + '> .lastRoll').html('Last Dash: ' + players[turn%4].lastRoll);
  }
};

// Roll effects
var rollEffects = function(player, roll){
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
};

// Random Dice Roll
var getRoll = function(){
  return Math.ceil(Math.random()*6);
};

// Hide a button
var hideButton = function(button){
  $('#button' + button).css('display', 'none');
};

// Show a button
var showButton = function(nowTurn){
  $('#button' + nowTurn).css('display', '');
}

//
var winCheck = function(){
  if ((players[0].score <= players[1].score) ||
      (players[0].score <= players[3].score) ||
      (players[2].score <= players[1].score) ||
      (players[2].score <= players[3].score)) {
    winners = 'cops';
    return 'Sweet Justice...';
  } else if ((players[1].score <= 0) && (players[3].score <= 0)){
    winners = 'robbers';
    return 'Evil as a cookie...';
  } else { return null; }
}

var winMessage = function(){
  if(winners == 'cops'){
    console.log('cops have won goes here');
  } else if(winners == 'robbers'){
    console.log('robbers have won goes here');
  } else if(winners == null){
    console.log('winCheck error, shouldn\'t be showing...');
  }
}

// Check for a roll that causes a missed turn
var missCheck = function(roll){
  if (players[lastTurn%4].lastRoll == roll){
    return true;
  } else { return false; }
};

// Unique first Round Pass
var firstRound = function (){
  turn = Math.ceil(Math.random()*4); // Can be improved to actually see 4 rolls later
  roll = getRoll();                  // Bonus roll
  players[turn%4].score -= roll;
  updateScores();
  hideButton(1);
  showButton(turn%4 + 1);
  // moveFeed(player[turn%5].id + 'has won the roll with a ' + roll)
  console.log(players[turn%4].id + ' has rolled a ' + roll);
};

// Normal Rounds
var normalRound = function(){
  roll = getRoll(); // Shove to appropriate HTML element
  if (missCheck(roll) == false){
    console.log(players[turn%4].id + ' has rolled a ' + roll);
    players[turn%4].lastRoll = roll;
    rollEffects(players[turn%4], roll);
    lastTurn = turn;
    updateScores(players[turn%4]);
    // Checks for bonus roll
    if(roll === 6){
      roll = getRoll();
      players[turn%4].lastRoll = roll;
      rollEffects(players[turn%4], roll);
      lastTurn = turn;
      updateScores(players[turn%4]);
    }
  } else { console.log(players[turn%4].id + ' has rolled a ' + roll);
           console.log('\nSadly... so did ' + players[lastTurn%4].id);
           console.log(' and thus loses his turn due to being a copycat... ');
         }

  turn++;
  console.log('Turn at end of round = ' + turn);

  // Toggle button to next player
  showButton(turn%4 + 1);
  hideButton(lastTurn%4 + 1);

  // Post turn checks
  if(winCheck() != null){
    winMessage();
  }
};

// Set up players
setUp();
// Show a button that starts the game
showButton(1);


  // $('#button').click(function(){
  if (turn == 0){ $('.button').click(function(){
      firstRound();
    });
  }

  if (turn != 1){ $('.button').click(function(){
     normalRound();
   });
  }
//}()); //MODULE ENDING

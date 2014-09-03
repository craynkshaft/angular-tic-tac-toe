var app = angular.module('ticTacToe', ["firebase"]);
app.controller('gameController', ['$scope', '$firebase', function($scope, $firebase) {

$scope.container = {boxes:[0, 0, 0, 0, 0, 0, 0, 0, 0], turn: 0, currentWidth: "312px", playerOneTurn: true, message: "Welcome to TicTac. Enter your name and invite a friend to play.", players: [{name: "Player 1", score: 0, color: "olive"}, {name: "Player 2", score: 0, color: "tomato"}], currentGame: 3, gameInProgress: true};
$scope.gameboard = document.getElementById('gameboard');
$scope.background = document.getElementsByTagName('body');
$scope.snd = new Audio("sound/coins.mp3");

var ref = $firebase(new Firebase("https://rantactoe.firebaseio.com/data"));
ref.$bind($scope, "container");

$scope.turn = $scope.container.turn;
$scope.$watch('container', function(){
});

/*
$scope.container.players = [{
  name: "Player 1",
  score: 0,
  color: "olive",
},
{
  name: "Player 2",
  score: 0,
  color: "tomato",
}];
*/

//runs on startup and reset
$scope.startup = function(){
  $scope.container.gameInProgress = true;
  $scope.container.currentWidth = "312px";
  $scope.click = 0;
  $scope.container.message = "Welcome to TicTac";
  $scope.container.turn = 0;
  $scope.container.playerOneTurn = true;
  $scope.container.currentGame = 3;
  $scope.container.boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $scope.container.currentWidth = ($scope.container.currentGame * 104)+"px";
  document.getElementById('playerOne').style.backgroundColor=$scope.container.players[0].color; 
  document.getElementById('playerTwo').style.backgroundColor=$scope.container.players[1].color; 
};

$scope.turnIndicator = function(){
  if ($scope.container.playerOneTurn){
    return "left";
  } else {
    return "right";
  }
}

//runs each time the gameboard size changes
$scope.setSize = function(x){
  $scope.container.gameInProgress = true;
  $scope.container.currentGame = x;
  $scope.container.currentWidth = (x * 104)+"px";

  //if increasing the size of the gameboard
  if ((x * x) > $scope.container.boxes.length){
    $scope.container.message = "Create 2x2 a square to win";
    $scope.difference = (x * x)-$scope.container.boxes.length;
    var diffArray = new Array($scope.difference)
    //adds value of "0" to each spot in the new array
    for (var i = 0; i < diffArray.length; i++) diffArray[i] = 0;
    $scope.container.boxes = $scope.container.boxes.concat(diffArray);
  }
  //if decreasing the size of the gameboard
  if ((x * x) < $scope.container.boxes.length){
    //increase the size of the gameboard array according to the difference in size
    $scope.difference = $scope.container.boxes.length-(x * x);
    $scope.container.boxes.splice((x*x), $scope.difference)
  }
  //change container width to current game size
  $scope.winner();
};


//returns the player Object whose turn it is
$scope.whoseTurn = function(){
  if ($scope.container.turn % 2 == 0){ 
    return $scope.container.players[0];
  } else {
    return $scope.container.players[1];
  }
}


//run each time a box is clicked
$scope.boxClick = function(x, y){
  if (!$scope.playerNumber){
    if($scope.container.turn > 0){
      $scope.playerNumber = 2
    } else {
      $scope.playerNumber = 1
    }
  }
if ($scope.container.gameInProgress && $scope.container.boxes[x] == 0){
    if ($scope.playerNumber == 1 && $scope.container.turn % 2 == 0){
      $scope.container.boxes[x] = 1;
      $scope.container.turn += 1; 
      $scope.container.playerOneTurn = false;
    } 
    if ($scope.playerNumber == 2 && $scope.container.turn % 2 != 0) {
      $scope.container.boxes[x] = -1;
      $scope.container.turn += 1;
      $scope.container.playerOneTurn = true;
    }
    $scope.container.message = $scope.whoseTurn().name + ", it's your turn.";
  }
  $scope.winner();
};


//this changes the color of the game square on click
$scope.clickColor = function(x){
  if (x == 1) {
    return $scope.container.players[0].color;
  } 
  if (x == -1){
    return $scope.container.players[1].color}
}


//tracks winning conditions for the three games
$scope.winner = function(){
  switch ($scope.container.currentGame){
    case 3:
      var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
      
      for (i=0; i<8; i++){
        if(Math.abs($scope.container.boxes[winners[i][0]]+$scope.container.boxes[winners[i][1]]+$scope.container.boxes[winners[i][2]])===3){
          $scope.container.turn -= 1;
          $scope.whoseTurn().score += 125;
          $scope.snd.play();
          //$scope.container.message = $scope.whoseTurn().name + " wins! Click to continue.";
          $scope.container.gameInProgress = false;
          $scope.setSize(6);
          //window.onmousedown=function(){$scope.setSize(6)};      
          $scope.container.turn += 1;
        } 

      } 
        if ($scope.container.boxes.indexOf(0) === -1){
          alert("It's a tie!");
          $scope.setSize(6);
        }  
      break;

    case 6:
    $scope.container.message = "Round 2: Build a 2x2 to win";
      for (i=0; i<($scope.container.currentGame*$scope.container.currentGame)-$scope.container.currentGame; i++){
        if (Math.abs($scope.container.boxes[i]+$scope.container.boxes[i+1]+$scope.container.boxes[i+$scope.container.currentGame]+$scope.container.boxes[i+1+$scope.container.currentGame])===4){
          $scope.container.turn -= 1;
          $scope.whoseTurn().score += 250;
          $scope.snd.play();
          //$scope.container.message = $scope.whoseTurn().name + " wins! Click to continue.";
          $scope.container.gameInProgress = false;
          $scope.container.turn += 1
          $scope.setSize(9);
          //window.onmousedown=function(){$scope.setSize(9)}; 
        }
        if ($scope.container.boxes.indexOf(0) === -1){
          alert("It's a tie!");
          $scope.setSize(9);
        } 
      } break;

    case 9:
    //these are the messages being printed going into the final round
    if ($scope.container.players[0].score > $scope.container.players[1].score){
      $scope.container.message = $scope.container.players[0].name + " leads " + $scope.container.players[0].score + " to " + $scope.container.players[1].score + "! Build a 2x2 to win";
    }
    if ($scope.container.players[1].score > $scope.container.players[0].score){
      $scope.container.message = $scope.container.players[1].name + " leads " + $scope.container.players[1].score + " to " + $scope.container.players[0].score + "! Build a 2x2 to win";
    }
    if ($scope.container.players[1].score == $scope.container.players[0].score){
      $scope.container.message = "It's a tie! Build a 2x2 to win";
    }
      for (i=0; i<($scope.container.currentGame*$scope.container.currentGame)-$scope.container.currentGame; i++){
        if (Math.abs($scope.container.boxes[i]+$scope.container.boxes[i+1]+$scope.container.boxes[i+$scope.container.currentGame]+$scope.container.boxes[i+1+$scope.container.currentGame])===4){
          $scope.container.turn -= 1;
          $scope.whoseTurn().score += 350;
          $scope.snd.play();
          $scope.container.gameInProgress = false;
          $scope.container.message = "The final score is, " + $scope.container.players[0].name + ": " + $scope.container.players[0].score + " and " + $scope.container.players[1].name + ": " + $scope.container.players[1].score + "! Would you like to keep playing?"
          //document.onmousedown=function(){$scope.startup()}; 
          $scope.startup()
          //$scope.container.turn += 1
        }
      } break;
    };
};


//changes color for each player
$scope.colorChange = function(x){
  var colors = ['green', 'purple', 'olive', 'tomato', 'cornflowerblue', 'turquoise', 'hotpink', 'darkorange', 'darkred', 'lightsalmon', 'Brown', 'BurlyWood', 'DarkSlateBlue', 'DarkSlateGray', 'FireBrick', 'MidnightBlue', 'SaddleBrown'];
  var random = Math.floor(Math.random() * (colors.length-1));

  if (x==1 && $scope.playerNumber==1){
    $scope.container.players[0].color = colors[random]; 
  }
  if (x==2 && $scope.playerNumber==2){
    $scope.container.players[1].color = colors[random]; 
  }
}

window.onload = $scope.startup();
}]);

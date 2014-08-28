var app = angular.module('ticTacToe', ["firebase"]);
app.controller('gameController', ['$scope', '$firebase', function($scope, $firebase) {

$scope.container = {boxes:[0, 0, 0, 0, 0, 0, 0, 0, 0]};
$scope.gameboard = document.getElementById('gameboard');
$scope.snd = new Audio("sound/coins.mp3");

var ref = $firebase(new Firebase("https://rantactoe.firebaseio.com/data"));
ref.$bind($scope, "container");

$scope.$watch('container', function(){
});

$scope.players = [{
  name: "Player 1",
  score: 0,
  color: "olive",
  mark: 1
},
{
  name: "Player 2",
  score: 0,
  color: "tomato",
  mark: -1
}];


//runs on startup and reset
$scope.startup = function(){
  $scope.click = 0;
  $scope.message = "Welcome to TicTacToes! " + $scope.players[0].name + ", you're up.";
  $scope.turn = 0;
  $scope.currentGame = 3;
  $scope.container.boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $scope.gameboard.style.width = ($scope.currentGame * 104)+"px";
  document.getElementById('playerOne').style.backgroundColor=$scope.players[0].color;
};


//runs each time the gameboard size changes
$scope.setSize = function(x){
  $scope.currentGame = x;
  $scope.currentWidth = (x * 104)+"px";

  //if increasing the size of the gameboard
  if ((x * x) > $scope.container.boxes.length){
    $scope.message = "Create 2x2 a square to win";
    var difference = (x * x)-$scope.container.boxes.length;
    var diffArray = new Array(difference)
    //adds value of "0" to each spot in the new array
    for (var i = 0; i < diffArray.length; i++) diffArray[i] = 0;
    $scope.container.boxes = $scope.container.boxes.concat(diffArray);
  }
  //if decreasing the size of the gameboard
  if ((x * x) < $scope.container.boxes.length){
    //increase the size of the gameboard array according to the difference in size
    var difference = (x * x)-$scope.container.boxes.length;
    $scope.container.boxes.splice((x*x), Math.abs(difference))
  }
  //change container width to current game size
  $scope.gameboard.style.width = $scope.currentWidth;
  $scope.winner();
};


//returns the player Object whose turn it is
$scope.whoseTurn = function(){
  if ($scope.turn % 2 == 0){ 
    return $scope.players[0];
  } else {
    return $scope.players[1];
  }
}


//run each time a box is clicked
$scope.boxClick = function(x, y){
  if (Math.abs($scope.container.boxes[x]) !== 1){
    if ($scope.turn % 2 == 0){
      $scope.container.boxes[x] = 1;
      document.getElementById('playerOne').style.backgroundColor="";
      document.getElementById('playerTwo').style.backgroundColor=$scope.players[1].color;

    } else {
      $scope.container.boxes[x] = -1;
      document.getElementById('playerOne').style.backgroundColor=$scope.players[0].color;
      document.getElementById('playerTwo').style.backgroundColor="";
    }
    $scope.turn += 1;
    $scope.winner();
  }
};


//this changes the color of the square on click
$scope.clickColor = function(x){
  if (x == 1) {
    return $scope.players[0].color;
  } 
  if (x== -1){
    return $scope.players[1].color}
}


//tracks winning conditions for the three games
$scope.winner = function(){
  switch ($scope.currentGame){
    case 3:
      var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
      
      for (i=0; i<8; i++){
        if(Math.abs($scope.container.boxes[winners[i][0]]+$scope.container.boxes[winners[i][1]]+$scope.container.boxes[winners[i][2]])===3){
          $scope.turn -= 1;
          $scope.message = $scope.whoseTurn().name + " wins!";
          $scope.whoseTurn().score += 125;
          $scope.snd.play();
          $scope.setSize(6);
          $scope.turn += 1;
        } 
        if ($scope.container.boxes.indexOf(0) === -1){
          alert("It's a tie!");
          $scope.setSize(6);
        }       
      } break;

    case 6:
    $scope.message = "Round 2: Build a 2x2 to win";
      for (i=0; i<($scope.currentGame*$scope.currentGame)-$scope.currentGame; i++){
        if (Math.abs($scope.container.boxes[i]+$scope.container.boxes[i+1]+$scope.container.boxes[i+$scope.currentGame]+$scope.container.boxes[i+1+$scope.currentGame])===4){
          $scope.turn -= 1;
          $scope.whoseTurn().score += 250;
          $scope.snd.play();
          $scope.turn += 1
          $scope.setSize(9);
        }
      } break;

    case 9:
    //these are the messages being printed going into the final round
    if ($scope.players[0].score > $scope.players[1].score){
      $scope.message = $scope.players[0].name + " leads in the final round! " + $scope.players[0].score + " to " + $scope.players[1].score + "! Build a 2x2 to win";
    }
    if ($scope.players[1].score > $scope.players[0].score){
      $scope.message = $scope.players[1].name + " leads in the final round! " + $scope.players[1].score + " to " + $scope.players[0].score + "! Build a 2x2 to win";
    }
    if ($scope.players[1].score == $scope.players[0].score){
      $scope.message = "It's a tie going into the last round! Build a 2x2 to win";
    }
      for (i=0; i<($scope.currentGame*$scope.currentGame)-$scope.currentGame; i++){
        if (Math.abs($scope.container.boxes[i]+$scope.container.boxes[i+1]+$scope.container.boxes[i+$scope.currentGame]+$scope.container.boxes[i+1+$scope.currentGame])===4){
          $scope.turn -= 1;
          $scope.whoseTurn().score += 350;
          $scope.snd.play();

        var r = confirm("The final score is, " + $scope.players[0].name + ": " + $scope.players[0].score + " and " + $scope.players[1].name + ": " + $scope.players[1].score + "! Would you like to keep playing?");
          if (r == true) {
            x = $scope.startup();
          }
        }
      } break;
    };
  //code for ties
  if ($scope.container.boxes.indexOf(0) === -1){
  alert("It's a tie!");
  }      
};


//changes color for each player
$scope.colorChange = function(x){
  var colors = ['green', 'purple', 'olive', 'tomato', 'cornflowerblue', 'turquoise', 'hotpink', 'darkorange', 'darkred', 'lightsalmon', 'Brown', 'BurlyWood', 'DarkSlateBlue', 'DarkSlateGray', 'FireBrick', 'MidnightBlue', 'SaddleBrown'];
  var random = Math.floor(Math.random() * (colors.length-1));

  if (x==1){
    $scope.players[0].color = colors[random]; 
    document.getElementById('playerOne').style.backgroundColor=$scope.players[0].color;
  }
  if (x==2){
    $scope.players[1].color = colors[random]; 
    document.getElementById('playerTwo').style.backgroundColor=$scope.players[1].color;
  }
}

window.onload = $scope.startup();
}]);

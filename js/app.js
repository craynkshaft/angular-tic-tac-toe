var app = angular.module('ticTacToe', []);
app.controller('gameController', ['$scope', function($scope) {

$scope.boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
$scope.gameboard = document.getElementById('gameboard');
$scope.turn = 0;
$scope.playerOne = {
  name: "Player 1",
  score: 0,
  color: "red"
};
$scope.playerTwo = {
  name: "Player 2",
  score: 0,
  color: "blue"
};

//$scope.currentGame
$scope.currentWidth
//$scope.header = document.getElementById('gameboard');
//$scope.message = "Welcome to TicTacToes!";

$scope.startup = function(){
  $scope.click = 0;

  $scope.message = "Welcome to TicTacToes!";
  $scope.turn = 0;
  $scope.currentGame = 3;
  $scope.boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  //$scope.playerOne.score = 0;
  //$scope.playerTwo.score = 0;
  $scope.gameboard.style.width = ($scope.currentGame * 104)+"px";
  document.getElementById("three").style.fontWeight="bold";
  document.getElementById("six").style.fontWeight="normal";
  document.getElementById("nine").style.fontWeight="normal";
  document.getElementById('playerTwo').style.backgroundColor="";
  document.getElementById('playerOne').style.backgroundColor=$scope.playerOne.color;
};

//consider rebuilding this so i can create custom messages for each round
$scope.setSize = function(x){
  $scope.currentGame = x;
  $scope.currentWidth = (x * 104)+"px";

  //if increasing the size of the gameboard
  if ((x * x) > $scope.boxes.length){
    $scope.message = "Create 2x2 a square to win";
    //setTimeout(function(){$scope.message = "this was a timeout"}, 2000);
    var difference = (x * x)-$scope.boxes.length;
    var diffArray = new Array(difference)
    //adds value of "" to each spot in the new array
    for (var i = 0; i < diffArray.length; i++) diffArray[i] = 0;
    $scope.boxes = $scope.boxes.concat(diffArray);
  }
  //if decreasing the size of the gameboard
  if ((x * x) < $scope.boxes.length){
    if($scope.currentGame==3){
      $scope.message = "Good ol' fashioned tictactoe!"
    }
    var difference = (x * x)-$scope.boxes.length;
    $scope.boxes.splice((x*x), Math.abs(difference))
  }
  //change container size to current game size
  $scope.gameboard.style.width = $scope.currentWidth;
   $scope.winner();
    //console.log("You lose a turn for changing the board size to "+ $scope.currentGame + " x "+ $scope.currentGame)
    //$scope.turn += 1;
};

$scope.boxClick = function(x){
  if ($scope.boxes[x] !== Math.abs(1)){
    if ($scope.turn % 2 == 0){
      $scope.boxes[x] = 1;

      document.getElementById('playerOne').style.backgroundColor="";
      document.getElementById('playerTwo').style.backgroundColor=$scope.playerTwo.color;
    } else {
      $scope.boxes[x] = -1;
      document.getElementById('playerOne').style.backgroundColor=$scope.playerOne.color;
      document.getElementById('playerTwo').style.backgroundColor="";
    }
    $scope.turn += 1;
    $scope.winner();
  }
    //$scope.message = "It's your turn, " + $scope.whoseTurn().name;
};

$scope.whoseTurn = function(){
  if ($scope.turn % 2 == 0){ 
    return $scope.playerOne;
  } else {
    return $scope.playerTwo;
  }
}

//this needs some work...could be causing double click problem
$scope.whichColor = function(x) {
  if ($scope.boxes[x]===1){
    //console.log("index = 1")
    return 'red';
  }
  if ($scope.boxes[x]===-1){
    //console.log("index = -1")
    return 'blue';
  } else {
      return null;
    }
};

$scope.winner = function(){
    
switch ($scope.currentGame){
    case 3:
      document.getElementById("three").style.fontWeight="bold";
      document.getElementById("six").style.fontWeight="normal";
      document.getElementById("nine").style.fontWeight="normal";
      var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
      
      for (i=0; i<8; i++){
        if(Math.abs($scope.boxes[winners[i][0]]+$scope.boxes[winners[i][1]]+$scope.boxes[winners[i][2]])===3){
          $scope.turn -= 1;
          
          $scope.message = $scope.whoseTurn().name + " wins!";
          $scope.whoseTurn().score += 125;

          //$scope.gameOver = true;
          //$scope.startup();

          $scope.setSize(6);
          $scope.turn += 1;
        } 
        if ($scope.boxes.indexOf(0) === -1){
          alert("It's a tie!");
          $scope.setSize(6);
        } 
          
      } break;

    case 6:
    $scope.message = "Round 2: Build a 2x2 to win";
      document.getElementById("three").style.fontWeight="normal";
      document.getElementById("six").style.fontWeight="bold";
      document.getElementById("nine").style.fontWeight="normal";

      for (i=0; i<($scope.currentGame*$scope.currentGame)-$scope.currentGame; i++){
        if (Math.abs($scope.boxes[i]+$scope.boxes[i+1]+$scope.boxes[i+$scope.currentGame]+$scope.boxes[i+1+$scope.currentGame])===4){
          //$scope.turn -= 1;
          //$scope.whoseTurn().score += 10;
          //console.log("winner")
          $scope.turn -= 1;
          $scope.whoseTurn().score += 250;
          //$scope.message = " wins the game!")
          //$scope.startup();
          //$scope.currentGame = 3;

          $scope.turn += 1
          $scope.setSize(9);
        }

      } break;
    case 9:
    if ($scope.playerOne.score > $scope.playerTwo.score){
      $scope.message = $scope.playerOne.name + " leads in the final round! " + $scope.playerOne.score + " to " + $scope.playerTwo.score + "! Build a 2x2 to win";
    }
    if ($scope.playerTwo.score > $scope.playerOne.score){
      $scope.message = $scope.playerTwo.name + " leads in the final round! " + $scope.playerTwo.score + " to " + $scope.playerOne.score + "! Build a 2x2 to win";
    }
    if ($scope.playerTwo.score == $scope.playerOne.score){
      $scope.message = "It's a tie going into the last round! Build a 2x2 to win";
    }
    
      document.getElementById("three").style.fontWeight="normal";
      document.getElementById("six").style.fontWeight="normal";
      document.getElementById("nine").style.fontWeight="bold";

      for (i=0; i<($scope.currentGame*$scope.currentGame)-$scope.currentGame; i++){
        if (Math.abs($scope.boxes[i]+$scope.boxes[i+1]+$scope.boxes[i+$scope.currentGame]+$scope.boxes[i+1+$scope.currentGame])===4){
          //$scope.turn -= 1;
          //$scope.whoseTurn().score += 10;
          //console.log("winner")
          $scope.turn -= 1;
          $scope.whoseTurn().score += 350;
          if ($scope.playerOne.score > $scope.playerTwo.score){
            $scope.message = $scope.playerOne.name + " wins the game! " + $scope.playerOne.score + " to " + $scope.playerTwo.score + "!";
          }
          if ($scope.playerTwo.score > $scope.playerOne.score){
            $scope.message = $scope.playerTwo.name + " wins the game! " + $scope.playerTwo.score + " to " + $scope.playerOne.score + "!";
          }


    var r = confirm("The final score is, " + $scope.playerOne.name + ": " + $scope.playerOne.score + " and " + $scope.playerTwo.name + ": " + $scope.playerTwo.score + "! Would you like to keep playing?");
    if (r == true) {
      x = $scope.startup();
    }
    }
    } break;
    };

  if ($scope.boxes.indexOf(0) === -1){
    alert("It's a tie!");
    //$scope.setSize(6);
  }      
};

$scope.colorChange = function(x){
  var colors = ['red', 'green', 'purple', 'olive', 'tomato', 'cornflowerblue ', 'turquoise', 'grey', 'hotpink', 'darkorange', 'darkred', 'lightsalmon', 'yellowgreen'];
  var random = Math.floor(Math.random() * (colors.length-1));

  if (x==1){
    $scope.playerOne.color = colors[random]; 
    document.getElementById('playerOne').style.backgroundColor=$scope.playerOne.color;
  }
  if (x==2){
    $scope.playerTwo.color = colors[random]; 
    document.getElementById('playerTwo').style.backgroundColor=$scope.playerTwo.color;
  }
}


window.onload = $scope.startup();
}]);

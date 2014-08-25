var app = angular.module('ticTacToe', []);
app.controller('gameController', ['$scope', function($scope) {

$scope.boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
$scope.gameboard = document.getElementById('gameboard');
$scope.snd = new Audio("sound/coins.mp3");

/*
$scope.players = {
  name: "Player 1",
  score: 0,
  color: "red"
};
{
  name: "Player 2",
  score: 0,
  color: "green"
};
*/


$scope.playerOne = {
  name: "Player 1",
  score: 0,
  color: "red"
};
$scope.playerTwo = {
  name: "Player 2",
  score: 0,
  color: "green"
};



$scope.startup = function(){
  $scope.click = 0;
  $scope.message = "Welcome to TicTacToes! " + $scope.playerOne.name + ", you're up.";
  $scope.turn = 0;
  $scope.currentGame = 3;
  $scope.boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  $scope.gameboard.style.width = ($scope.currentGame * 104)+"px";
  //document.getElementById('playerTwo').style.backgroundColor=$scope.playerTwo.color;
  document.getElementById('playerOne').style.backgroundColor=$scope.playerOne.color;
};

//runs each time the gameboard size changes
$scope.setSize = function(x){
  $scope.currentGame = x;
  $scope.currentWidth = (x * 104)+"px";

  //if increasing the size of the gameboard
  if ((x * x) > $scope.boxes.length){
    $scope.message = "Create 2x2 a square to win";
    var difference = (x * x)-$scope.boxes.length;
    var diffArray = new Array(difference)
    //adds value of "0" to each spot in the new array
    for (var i = 0; i < diffArray.length; i++) diffArray[i] = 0;
    $scope.boxes = $scope.boxes.concat(diffArray);
  }
  //if decreasing the size of the gameboard
  if ((x * x) < $scope.boxes.length){
    //increase the size of the gameboard array according to the difference in size
    var difference = (x * x)-$scope.boxes.length;
    $scope.boxes.splice((x*x), Math.abs(difference))
  }
  //change container width to current game size
  $scope.gameboard.style.width = $scope.currentWidth;
  $scope.winner();
};


//returns the player Object whose turn it is
$scope.whoseTurn = function(){
  if ($scope.turn % 2 == 0){ 
    return $scope.playerOne;
  } else {
    return $scope.playerTwo;
  }
}


//run each time a box is clicked
$scope.boxClick = function(x){
  if (Math.abs($scope.boxes[x]) !== 1){
    if ($scope.turn % 2 == 0){
      $scope.boxes[x] = 1;
      document.getElementById('playerOne').style.backgroundColor="";
      document.getElementById('playerTwo').style.backgroundColor=$scope.playerTwo.color;
    //need some code here to turn the boxes the correct color

    } else {
      $scope.boxes[x] = -1;
      document.getElementById('playerOne').style.backgroundColor=$scope.playerOne.color;
      document.getElementById('playerTwo').style.backgroundColor="";
    //need some code here to turn the boxes the correct color

    }
    $scope.turn += 1;
    $scope.winner();
    console.log($scope.whoseTurn())
  }
};


//this needs some work...
$scope.whichColor = function(x) {
  if ($scope.boxes[x]===1){
    



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
      var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
      
      for (i=0; i<8; i++){
        if(Math.abs($scope.boxes[winners[i][0]]+$scope.boxes[winners[i][1]]+$scope.boxes[winners[i][2]])===3){
          $scope.turn -= 1;
          $scope.message = $scope.whoseTurn().name + " wins!";
          $scope.whoseTurn().score += 125;
          $scope.snd.play();

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
      for (i=0; i<($scope.currentGame*$scope.currentGame)-$scope.currentGame; i++){
        if (Math.abs($scope.boxes[i]+$scope.boxes[i+1]+$scope.boxes[i+$scope.currentGame]+$scope.boxes[i+1+$scope.currentGame])===4){
          //$scope.turn -= 1;
          //$scope.whoseTurn().score += 10;
          //console.log("winner")
          $scope.turn -= 1;
          $scope.whoseTurn().score += 250;
          $scope.snd.play();
          //$scope.message = " wins the game!")
          //$scope.startup();
          //$scope.currentGame = 3;

          $scope.turn += 1
          $scope.setSize(9);
        }
      } break;

    case 9:
    //these are the messages being printed going into the final round
    if ($scope.playerOne.score > $scope.playerTwo.score){
      $scope.message = $scope.playerOne.name + " leads in the final round! " + $scope.playerOne.score + " to " + $scope.playerTwo.score + "! Build a 2x2 to win";
    }
    if ($scope.playerTwo.score > $scope.playerOne.score){
      $scope.message = $scope.playerTwo.name + " leads in the final round! " + $scope.playerTwo.score + " to " + $scope.playerOne.score + "! Build a 2x2 to win";
    }
    if ($scope.playerTwo.score == $scope.playerOne.score){
      $scope.message = "It's a tie going into the last round! Build a 2x2 to win";
    }
    
      for (i=0; i<($scope.currentGame*$scope.currentGame)-$scope.currentGame; i++){
        if (Math.abs($scope.boxes[i]+$scope.boxes[i+1]+$scope.boxes[i+$scope.currentGame]+$scope.boxes[i+1+$scope.currentGame])===4){
          $scope.turn -= 1;
          $scope.whoseTurn().score += 350;
          $scope.snd.play();

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
  }      
};

$scope.colorChange = function(x){
  var colors = ['green', 'purple', 'olive', 'tomato', 'cornflowerblue', 'turquoise', 'hotpink', 'darkorange', 'darkred', 'lightsalmon', 'Brown', 'BurlyWood', 'DarkSlateBlue', 'DarkSlateGray', 'FireBrick', 'MidnightBlue', 'SaddleBrown'];
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

function User(name, creatureType) {
  this.userName = name;
  this.userChar = creatureType;
  this.userStrength = 0;
  this.userIntellect = 0;
  this.userHealth = 10;
  this.userPosition = [];
  this.userInventory = [];
};

function Room() {
  this.narrative = "You enter a room. Dimly lit a fog is crawling in through the cracks on the west wall.";
  this.northPassable = false;
  this.southPassable = false;
  this.westPassable = false;
  this.eastPassable = false;
  this.items = ["key"];
  this.creatures = [];
}

Room.prototype.interact = function (user, item) {
  for (i=0; i < this.items.length; i++){
    if (this.items[i] === item){
      user.userInventory.push(this.items[i]);
      this.items.splice(i,1);
    }
  }
}

User.prototype.addIntellect = function() {
  if (diceRoll() + this.userIntellect> 3) {
    this.userIntellect += 2;
    alert('you passed!')
  } else {
    alert("try again");
  }
  return this.userIntellect;
}

User.prototype.addStrength = function() {

  if (diceRoll() + this.userStrength > 3) {
    this.userStrength += 2;
    alert('you passed!')
  } else {
    alert("try again");
  }
  return this.userStrength;
}

function diceRoll() {
  return (Math.floor(Math.random() * 6+1));
  console.log()
}


$(document).ready(function() {
  var pass = false;
  var newUser;
  var diceRoll;
  function showScore() {
    $('.this-health').text(newUser.userHealth);
    $('.this-strength').text(newUser.userStrength);
    $('.this-intellect').text(newUser.userIntellect);
  }
  $('form#begin').click(function(event) {
    event.preventDefault();
    var userName = $('#user-name').val();
    var userChar = $('#user-char').val();
    newUser = new User(userName, userChar);
    $('form#begin').addClass('hide');
    $('.this-name').append(newUser.userName);
    $('.this-type').append(newUser.userChar);
    showScore();
    $('#user-info').addClass('show');
    $('#game').addClass('show');
  });

  $('.option1').click(function() {
    newUser.addIntellect();
    console.log(newUser.userIntellect);
    showScore();
  });
  $('.option2').click(function() {
    newUser.addStrength();
    console.log(newUser.userStrength);
    showScore();
  });

});

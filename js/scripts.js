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
  this.narrative = ["You enter a room. Dimly lit a fog is crawling in through the cracks on the west wall."];
  this.eventNarrative = "eventNarrative";
  this.northPassable = false;
  this.southPassable = false;
  this.westPassable = false;
  this.eastPassable = false;
  this.items = [
    new Item("lockpick", "intellect", "Pick up lockpick? It looks awfully rusty!"),
    new Item("hammer", "strength", "Pick up hammer? Looks like it's been used a time or two!"),
    new Item("book", "intellect", "Pick up book? Difficult, but you can read a few lines under the thick dust!")
  ];
  this.creatures = [
    new Creature("ghost" , 4, "OoOo a ghost has appeared! Cast a spell or fight it?"),
    new Creature("vampire", 3, "Watch out! A vampire is here!"),
    new Creature("dementors", 3, "Dementors are flying this way to suck your soul!")
  ];
}

function Item(itemName, itemTrait, itemNarrative) {
  this.itemName = itemName;
  this.itemTrait = itemTrait;
  this.itemNarrative = itemNarrative;
}

function Creature(creatureName, dmgOutput, creatureNarrative) {
  this.creatureName = creatureName;
  this.dmgOutput = dmgOutput;
  this.creatureNarrative = creatureNarrative;
}

Room.prototype.interact = function (user, item) {
  for (i=0; i < this.items.length; i++){
    if (this.items[i] === item){
      user.userInventory.push(this.items[i]);
      this.items.splice(i, 1);
      showScore();
    }
  }
}

Room.prototype.roomNarrative = function (user, narrative){
  return this.narrative;
}

User.prototype.addIntellect = function() {
  if (diceRoll() + this.userIntellect > 3) {
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

Creature.prototype.creatureDiceRoll = function(dmgOutput) {
  return (Math.floor(Math.random() * this.dmgOutput+1));
  console.log()
}

$(document).ready(function() {
  var pass = false;
  var newUser;
  var diceRoll;
  var newItem;

  function showScore() {
    $('.this-health').text(newUser.userHealth);
    $('.this-strength').text(newUser.userStrength);
    $('.this-intellect').text(newUser.userIntellect);
    $('.this-bag').append(newUser.userInventory);
  }

  $('#begin-button').click(function(event) {
    event.preventDefault();
    var userName = $('#user-name').val();
    var userChar = $('#user-char').val();
    newUser = new User(userName, userChar);
    $('form#begin').fadeOut();
    setTimeout(function() {
      $('.this-name').append(newUser.userName);
      $('.this-type').append(newUser.userChar);
      showScore();
    $('#user-info').addClass('show');
    $('#game').addClass('show');
    },900); 
  });

  $('.option1').click(function() {
    newUser.addIntellect();
    showScore();
  });
  $('.option2').click(function() {
    newUser.addStrength();
    showScore();
  });
  
  $('.this-scores').click(function() {
    $('#user-score').slideDown();
  })
});








function User(name, creatureType) {
  this.userName = name;
  this.userChar = creatureType;
  this.userAvatarImage = Avatar();
  this.userStrength = 0;
  this.userIntellect = 0;
  this.userHealth = 10;
  this.userPosition = [];
  this.userInventory = [];
};

var AvatarImg = ["_img/Dragon.png","_img/fairy.png","_img/centaur.png"];

var AvatarImgIndex = 0;

function Avatar(dragon,fairy,centaur){
  this.dragon = "_img/Dragon.png"
  this.fairy = "_img/fairy.png"
  this.centaur = "_img/centaur.png"
}

function Room() {
  this.narrative = ["You enter a room. Dimly lit a fog is crawling in through the cracks on the west wall."];
  this.eventNarrative = "eventNarrative";
  this.northPassable = false;
  this.southPassable = false;
  this.westPassable = false;
  this.eastPassable = false;
  this.doors = [];
  this.items = [
    new Item("lockpick", "intellect", "Select to pick up! It looks awfully rusty!"),
    new Item("hammer", "strength", "Select to pick up! Looks like it's been used a time or two!"),
    new Item("book", "intellect", "Select to pick up! Difficult, but you can read a few lines under the thick dust!")
  ];
  this.creatures = [
    new Creature("ghost" , 4, "OoOo a ghost has appeared! Cast a spell or fight it?"),
    new Creature("vampire", 3, "Watch out! A vampire is here!"),
    new Creature("dementors", 3, "Dementors are flying this way to suck your soul!")
  ];
};

function Door(){
  this.options = ["pick lock", "use hammer", "barge in"];
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

Room.prototype.interact = function(userInventory, item) {
  for (i=0; i < this.items.length; i++){
    if (this.items[i].itemName === item){
      userInventory.push(this.items[i]);
      console.log(userInventory);
      this.items.splice(i, 1);
      console.log(this.items);
    }
  }
}

Room.prototype.roomNarrative = function(user, narrative){
  return this.narrative;
}

User.prototype.addIntellect = function() {
  if (diceRoll() + this.userIntellect > 3) {
    this.userIntellect += 2;
    alert('you passed!');
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
};

Creature.prototype.creatureDiceRoll = function(dmgOutput) {
  return (Math.floor(Math.random() * this.dmgOutput+1));
};

<<<<<<< HEAD
/* ------- FRONT END -------- */
=======
User.prototype.addTrait = function(trait) {
  if (trait === "intellect") {
    this.userIntellect += 1;
  } else if (trait === "strength") {
    this.userStrength += 1;
  }
};

>>>>>>> 82d640642d369883c4091eda12e509c8fafd7079
$(document).ready(function() {
  var pass = false;
  var newUser;
  var diceRoll;
  var newItem;
  var currentRoom;

  setTimeout(function(){
    $("#begin").fadeIn("fast");
    $("#begin").animate({
      "height":"400px",
  },700);
  },1500);

  setTimeout(function() {
    $('#form-content').show();
  },3000);


  function showScore() {
    $('.this-health').text(newUser.userHealth);
    $('.this-strength').text(newUser.userStrength);
    $('.this-intellect').text(newUser.userIntellect);
    $('#user-bag').append(newUser.userInventory);
  }

  function roomInventory() {
    for (i=0;i<currentRoom.items.length;i++) {
      $("#room-inventory select").append("<option>" + i + " " + currentRoom.items[i].itemName + ": " + currentRoom.items[i].itemNarrative + "</option>");
    };
    $('#roomInventory').show();
  };

  $('#begin-button').click(function(event) {
    event.preventDefault();
    var userName = $('#user-name').val();
    var userChar = $('#user-char').val();
    newUser = new User(userName, userChar);
    currentRoom = new Room();
    setTimeout(function() {
      $('form#begin').fadeOut();
      $('.this-name').append(newUser.userName);
      $('.this-type').append(newUser.userChar);
      $('.narrative p').append(currentRoom.narrative);
      showScore();
      $('#user-info').addClass('show');
      $('#game').addClass('show');
    },900);
  });

  $('#search').click(function() {
    roomInventory();
  });

  $("#room-inventory select").change(function(){
    var itemSelected = ($("#room-inventory select option:selected").val()).substring(0,1);
    alert("Congratulations! You have gained 1 " + currentRoom.items[itemSelected].itemTrait + "!");
    newUser.addTrait(currentRoom.items[itemSelected].itemTrait);
    currentRoom.interact(newUser.userInventory, currentRoom.items[itemSelected].itemName);
    $("#room-inventory select").empty();
    roomInventory();
    showScore();
  });

  $('.option').show();
  $('#option1').click(function() {
    newUser.addIntellect();
    showScore();
  });

  $('#option2').click(function() {
    newUser.addStrength();
    showScore();
  });

  $('.this-scores').click(function() {
    $('#user-score').slideToggle();
  });
});

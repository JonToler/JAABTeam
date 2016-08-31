/*---backend---*/
function User(name, creatureType) {
  this.userName = name;
  this.userChar = creatureType;
  this.userAvatarImage = this.avatarImgSelector();
  this.userStrength = 0;
  this.userIntellect = 0;
  this.userHealth = 10;
  this.userPosition = [];
  this.userInventory = [];
  this.isDead = function() {if (this.health <= 0){return true} else {return false};};
};
/*---avatar---*/
User.prototype.avatarImgSelector = function() {
  return "img/avatar/" + this.userChar.toLowerCase() + ".png";
}


function Room() {
  this.narrative = ["You've entered a dimly lit room with a fog crawling in through the cracks on the west wall. You don't have much time! Search for some tools!"];
  this.eventNarrative = "eventNarrative";
  this.northPassable = false;
  this.southPassable = false;
  this.westPassable = false;
  this.eastPassable = false;
  this.doors = [new Door("northPassable", "image")];
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

function Door(location, image){
  this.locked = true;
  this.location = location;
  this.image = image;
  this.pickLock = function(user){
    if (diceRoll() <= user.userIntellect){
      this.locked = false;
      user.addIntellect();
      return "The door is now unlocked! You pass through and....";
    } else {
      return "Doh! You have failed to unlock the door.";
    }
  };

  this.breakDoor = function(user){
    if (diceRoll() <= user.userStrength){
      this.locked = false;
      user.addStrength();
      return "You have broken the door!";
    } else {
      return "Ah snap! You failed to break the door!";
    }
  }
};

function Item(itemName, itemTrait, itemNarrative) {
  this.itemName = itemName;
  this.itemTrait = itemTrait;
  this.itemNarrative = itemNarrative;
};


/*---monsters---*/
function Creature(creatureName, dmgOutput, creatureNarrative) {
  this.creatureName = creatureName;
  this.power = dmgOutput;
  this.creatureNarrative = creatureNarrative;
  this.isDead = function() {if (this.power <= 0){return true} else {return false};};
  this.monsterImage = this.monsterImgSelector();
  this.attackCreature = function(user, attackType){
    var hit = false;
    if (attackType === "strength"){
      if (diceRoll() <= user.userStrength){hit = true; user.addIntellect();}
    }
    else{
      if (diceRoll() <= user.userIntellect){hit = true; user.addStrength();}
    }
    if (hit){
      this.power -= 1;
      return "Hit!";
    }
    else {
      return "Miss!";
    }
  }
};


Creature.prototype.creatureDiceRoll = function(dmgOutput) {
  return (Math.floor(Math.random() * this.power+1));
};


User.prototype.monsterImgSelector = function() {
  return "img/monsters/" + this.creatureName.toLowerCase() + ".png";
}

/*---Rooms---*/
Room.prototype.interact = function(userInventory, item) {
  for (i=0; i < this.items.length; i++){
    if (this.items[i].itemName === item){
      userInventory.push(this.items[i]);
      this.items.splice(i, 1);
    }
  };
};

Room.prototype.roomNarrative = function(user, narrative){
  return this.narrative;
};

User.prototype.addIntellect = function() {
  this.userIntellect += 1;
};

User.prototype.addStrength = function() {
  this.userStrength += 1;
};

function diceRoll() {
  return (Math.floor(Math.random() * 6+1));
  console.log()
};



User.prototype.addTrait = function(trait) {
  if (trait === "intellect") {
    this.userIntellect += 1;
  } else if (trait === "strength") {
    this.userStrength += 1;
  }
};

/* ------- FRONT END -------- */
$(document).ready(function() {
  var newUser;
  var pass = false;
  var newUser;
  var diceRoll;
  var newItem;
  var currentRoom;

  function showScore() {
    $('.this-health').text(newUser.userHealth);
    $('.this-strength').text(newUser.userStrength);
    $('.this-intellect').text(newUser.userIntellect);
  };

  function roomInventory() {
    $("#room-inventory select").append("<option>Please select an item</option>")
    for (i=0;i<currentRoom.items.length;i++) {
      $('#room-inventory').addClass('show');
      $("#room-inventory select").append("<option>" + i + " " + currentRoom.items[i].itemName + ": " + currentRoom.items[i].itemNarrative + "</option>");
    };
    $('#roomInventory').show();
  };

  $('#search').click(function() {
    roomInventory();
  });

  $("#room-inventory select").change(function(){
    var itemSelected = ($("#room-inventory select option:selected").val()).substring(0,1);
    alert("Congratulations! You have gained 1 " + currentRoom.items[itemSelected].itemTrait + "!");
    newUser.addTrait(currentRoom.items[itemSelected].itemTrait);
    currentRoom.interact(newUser.userInventory, currentRoom.items[itemSelected].itemName);
    $("#room-inventory select").empty();
    $("#user-bag ul").empty();
    newUser.userInventory.forEach(function(item) {
      $('#user-bag ul').append("<li>" + item.itemName + "</li>");
    });
    roomInventory();
    showScore();
  });

  $('.option').show();
  $('#option1').click(function() {
    $('#event-log ul').append("<li>" + currentRoom.doors[1].pickLock(newUser) + "</li>");
    if (!currentRoom.doors[1].isLocked) {
      $('#event-log ul').append("<li>" + currentRoom.creatures[1].creatureNarrative) + "</li>");
    };
    showScore();
  });

  $('#option2').click(function() {
    $('#event-log ul').append("<li>" + currentRoom.doors[1].breakDoor(newUser) + "</li>");
    if (!currentRoom.doors[1].isLocked) {
      $('#event-log ul').append("<li>" + currentRoom.creatures[2].creatureNarrative) + "</li>");
    };
    showScore();
  });

  $('.this-scores').click(function() {
    $('#user-bag').hide();
    $('#user-score').slideToggle();
  });

  $('#this-bag').click(function() {
    $('#user-score').hide();
    $('#user-bag').slideToggle();
  });
/* ------- Introduction Form (userName, usrCreature) ---------- */
  setTimeout(function(){
    $("#begin").fadeIn();
    $("#begin").animate({
      "height":"350px",
  },700);
  },1500);

  setTimeout(function() {
    $('#form-content').slideDown(700);
  },3000);
/* ------------ Form on click event listener --------- */
  $('#begin-button').click(function(event) {
    event.preventDefault();
    var userName = $('#user-name').val();
    var userChar = $('#user-char').val();
    newUser = new User(userName, userChar);
    currentRoom = new Room();
    $('#form-content').slideUp(600);
    $('form#begin').fadeOut(800);
    setTimeout(function() {
      $('.this-name').append(newUser.userName);
      $('.this-type').append(newUser.userChar);
      $('.narrative').append(currentRoom.narrative);
      $('.user-avatar').prepend("<img src=" + newUser.userAvatarImage + ">");
      showScore();
      $('#user-info').slideDown();
      $('#game').fadeIn('slow');
    },900);
  });
});

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
  this.items = [];
  this.creatures = [];
}



$(document).ready(function() {
  $('form#begin').submit(function(event) {
    event.preventDefault();
    var userName = $('#user-name').val();
    var userChar = $('#user-char').val();
    var newUser = new User(userName, userChar);
    $('form#begin').addClass('hide');
    $('.this-name').append(newUser.userName);
    $('.this-type').append(newUser.userChar);
    $('.this-health').text(newUser.userHealth);
    $('#user-info').addClass('show');
  })

});

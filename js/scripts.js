function User(name, creatureType) {
  this.userName = name;
  this.userChar = creatureType;
  this.userStrength = 0;
  this.userIntellect = 0;
  this.userHealth = 10;
  this.userPosition = [];
  this.userInventory = [];
};
//BL
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


});

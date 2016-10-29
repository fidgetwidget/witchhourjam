var Game = require(__dirname+'/../game/Game.js');
var Log  = require(__dirname+'/../game/Log.js');

window.game = new Game();

setTimeout( function() {
  
  window.game.stop();
  Log.flush();

}, 9999)

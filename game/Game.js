var Unit        = require('./Unit.js');
var Log         = require('./Log.js');
var Scene       = require('./Scene.js');
var SceneState  = require('./SceneState.js');
// 
// Requires PIXI.js
// 

var Game = function () {
  
  this._ready     = false;
  this._startTime = 0;
  this._reqId     = null;
  this._div       = null
  this._renderer  = null;
  this._stage     = null;
  this._curScene  = undefined;
  this._nextScene = undefined;

  PIXI.loader
    .add("assets/test-scene-1.jpg")
    .load(this.setup.bind(this));

}

//
//  properties
//  
Game.prototype = {
  get ready () { 
    return this._ready; 
  },
  get renderer () { 
    return this._renderer; 
  },
  get stage () { 
    return this._stage; 
  }
}

Game.prototype.setScene = function (scene) 
{
  if (! (scene instanceof Scene)) return;

  this._nextScene = scene;
}

Game.prototype.getScene = function ()
{
  if (this._curScene === undefined) return null;

  return this._curScene;
}

Game.prototype.start = function ()
{
  if (!this.ready) return;

  this._startTime = +Date.now();

  Log.write("Start!");

  this._rafId = requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.stop = function ()
{
  if (this._rafId) cancelAnimationFrame(this._rafId);

  this._rafId = undefined;

  Log.write("Stop!");
}


Game.prototype.tick = function () 
{
  // scene transition
  if (this._nextScene) 
    return this.transitionBetweenScenes();

  if (this._curScene) this._curScene.tick();
}

Game.prototype.animate = function ()
{
  this.tick();

  this._renderer.render(this._stage);
  
  this._rafId = requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.setup = function () {
  
  this._div    = document.getElementById("game-elm");
  this._canvas = document.getElementById("game-container");
  
  var w, h;
  w = this._canvas.getAttribute('data-width');
  h = this._canvas.getAttribute('data-height');
  w = w ? parseInt(w) : 800;
  h = h ? parseInt(h) : 600;

  this._renderer = PIXI.autoDetectRenderer(w, h, { antialias: true, backgroundColor: 0x1099bb });
  this._canvas.appendChild(this._renderer.view);
  this._stage = new PIXI.Container();

  this._ready = true;

  this._curScene = new Scene();
  this._curScene.setup();

  this.start();
}


Game.prototype.transitionBetweenScenes = function ()
{
  // not transitioning
  if (this._nextScene === undefined) return;
  
  // cur scene isn't out yet
  if (this._curScene !== undefined)
  {
    if (this._curScene.state == SceneState.RUNNING)
      this._curScene.exit();
    else if (this._curScene.state == SceneState.TRANSITION_COMPLETE)
      this._curScene = undefined;
  }
  // ready for next to be current
  if (this._curScene === undefined)
  {
    if (this._nextScene !== null)
      this._nextScene.begin();

    this._curScene = this._nextScene;
    this._curScene.setStage(this._stage);
    this._nextScene = undefined;
  }

}

module.exports = Game;

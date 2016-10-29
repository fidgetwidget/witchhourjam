var Log = require('./Log.js');
var SceneState = require('./SceneState.js');
var Transition = require('./Transition.js');
var InteractionBox = require('./InteractionBox.js');

var Scene = function () 
{
  this.name = "";
  this.container = null;
  this.state = SceneState.NONE; // SceneState
  this.transitions = {
    in:   null, // Transition
    out:  null, // Transition
    step: null
  };
  this._stage = null;
}

// 
// Properties
// 

Scene.prototype.setStage = function (stage)
{
  this._stage = stage;
}

Scene.prototype.isInTransition = function ()
{
  return (this.state == SceneState.TRANSITION_IN ||
          this.state == SceneState.TRANSITION_OUT);
}

// 
// Methods
// 

Scene.prototype.setup = function (name)
{
  this.name = name;
  this.container = new PIXI.Container();
  this.state = SceneState.READY;

  var sprite = new PIXI.Sprite(
      PIXI.loader
          .resources["assets/test-scene-1.jpg"]
          .texture
  );

  var iBox = new InteractionBox(0, 0, 100, 200);
  var graphics = iBox.graphics;

  this.addChild(sprite);
  this.addChild(graphics);
}



Scene.prototype.addChild = function (child)
{
  this.container.addChild(child);
}



Scene.prototype.tick = function ()
{
  Log.write("test");

  if (this.isInTransition()) 
    return this.transitions.step();


  // Scene logic goes here
}


Scene.prototype.begin = function ()
{
  if (this.transitions.in)
  {
    this.state = SceneState.TRANSITION_IN;
    this.transitions.step = this.transitions.in.step.bind(this.transitions.in);
    this.transitions.in.complete = this._getRunning.bind(this);
  }
  else
    _getRunning();
}


Scene.prototype.exit = function ()
{
  if (this.transitions.out)
  {
    this.state = SceneState.TRANSITION_OUT;
    this.transitions.step = this.transitions.out.step.bind(this.transitions.out);
    this.transitions.out.complete = this._exitComplete.bind(this);
  }
  else
    _exitComplete();
}

// 
// Internal
// 

Scene.prototype._getRunning = function ()
{
  this.transitions.step = null;
  this.state = SceneState.RUNNING;
}


Scene.prototype._exitComplete = function ()
{
  this.transitions.step = null;
  this.state = SceneState.TRANSITION_COMPLETE;
}

// 
// Static methods
// 

Scene.create = function (name) 
{
  var s = new Scene();
  s.setup(name);
  return s;
}

module.exports = Scene;

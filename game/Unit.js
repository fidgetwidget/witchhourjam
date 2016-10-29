
var UnitTypes = [ "soldier", "general", "engineer" ]


var Unit = function () 
{
  this.type = null;
  this.scene = null;
  this.texture = null;
  this.x = 0;
  this.y = 0;
}

Unit.prototype.setType = function(value) 
{
  // validate the type
  if (!!value || UnitTypes.indexOf(value) < 0)
  {
    return this;
  }

  this.type = value;

  // setup the texture for the type
}

// 
// Static methods
// 

Unit.create = function (type, scene, x, y) 
{
  var u = new Unit();
  u.setType(type);
  u.scene = scene;
  u.x = x;
  u.y = y;
  return u;
}

module.exports = Unit;

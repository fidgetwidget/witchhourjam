var PIXI = require('pixi');

var InteractionBox = function (x, y, width, height) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

InteractionBox.prototype = {
    toString: function() {
        return "x - " + this.x + ", y - " + this.y + ", width - " + this.width + ", height - " + this.height;
    },
    get graphics ()
    {
      var graphics = new PIXI.Graphics();
      
      graphics.lineStyle(2, 0x0000FF, 1);
      graphics.beginFill(0xFF700B, 1);
      graphics.drawRect(50, 250, 120, 120);
      return graphics;
    }
}

module.exports = InteractionBox;

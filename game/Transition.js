
var Transition = function (durration = 1)
{
  this.current = 0;
  this.length  = durration;
}

Transition.prototype.step = function (delta = 1) 
{
  if (this.current + delta < this.length)
    this.current += delta;
  else
  {
    this.current = this.length;
    this.complete();
  }
}

Transition.prototype.complete = function () 
{
  console.log('Transition Complete.'); // override this function
}


module.exports = Transition;

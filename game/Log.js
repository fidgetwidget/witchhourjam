
var Log = function () {
  this.messages = [];
}

Log.prototype.write = function(message) {
  this.messages.push(message);
  console.log(""+Date.now()+": "+message);
}

Log.prototype.flush = function(target = null) {
  Log.print(target, this.messages)
  this.clear()
}

Log.prototype.clear = function() {
  this.messages.splice(0, -1);
}

Log.print = function(target, messages) {

  if (messages.constructor !== Array) messages = [messages];

  if (target && (typeof target) === "object")
  {
    if (target.hasOwnProperty('innerHTML'))
      return target.innerHTML = htmlMessages(message);

    if (target.hasOwnProperty('log'))
      return target.log = messages;

    if (typeof target.log === "function")
      return target.log(messages);
  }
  
  console.log(messages);

}

Log.htmlMessages = function(messages) {

  var text = "<ul>";
  for (var i = 0; i < messages.length - 1; i++)
  {
    var message = messages[i];
    text += "<li>"+message+"</li>";
  }
  text += "</ul>";
  return text;

}

module.exports = new Log();

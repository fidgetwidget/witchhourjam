var _       = require('lodash');
var low     = require('lowdb');
var db      = low(__dirname+'/../db.json', { writeOnChange: false });
var schemas  = require(__dirname+'/schemas.js');

var User = function (data) {
  this.data = this.sanitize(data);
}

User.prototype.data = {};

User.prototype.get = function (key) {
  return this.data[key];
}

User.prototype.set = function (key, val) {
  this.data[key] = val;
  return this;
}


User.prototype.sanitize = function (data) {  
  data = data || {};
  schema = schemas.user;
  return _.pick(_.defaults(data, schema), _.keys(schema));
}

User.prototype.save = function (cb) {
  var result = db.get('users').find({ id: this.data.id }).assign(this.data).value();
  console.log("save");
  console.log(result);
  return this;
}

User.prototype.delete = function (cb) {
  var result = db.get('users').remove({ id: this.data.id }).value();
  console.log("delete");
  console.log(result);
  return this;
}



User.raw = function () {
  return db.get('users');
}

User.all = function () {
  var results = db.get('users');
  if (results)
    return User.mapResults(results);
  return [];

}

User.filter = function (func) {
  var results = db.get('users').filter(func);
  if (results)
    return User.mapResults(results);
  return null;
}

User.findById = function (id) {
  var users = db.get('users');
  var user = users
    .filter(function(value, index, array) { return value.id == id; })
    .first()
    .value();
  if (user)
    return new User(user);

  return null;
}

User.mapResults = function (results)
{
  return results.map(
    function (value, index, array) {
      return new User(value);
    });
}


module.exports = User;

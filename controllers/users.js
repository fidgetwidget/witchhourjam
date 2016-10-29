var express = require("express");
var router  = express.Router();
var User = require(__dirname+"/../data/User.js");

router.param('user_id', function (req, res, next, id) 
{
  console.log('param.user_id:'+id);
  req.user_id = id;
  req.user = User.findById(id);
  if (! req.user) return next(handleError("user."+id+" not found.", 404));
  next();
});

router.get('/', function (req, res, next) 
{
  console.log('users.index');
  var users = User.all();
  res.json(users);
});

router.get('/raw/', function (req, res, next)
{
  console.log('users.raw');
  var raw = User.raw();
  res.json(raw);
})

router.get('/:user_id', function (req, res, next) 
{
  console.log('users.'+req.user_id);
  res.json(req.user);
});

module.exports = router;


function handleError(message, code) {
  code = (code === undefined || code === null) ? 500 : code;
  return {
    message: message,
    code: code
  }
}

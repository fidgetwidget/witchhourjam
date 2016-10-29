
module.exports = function (err, req, res, next) {

  err.code = err.code ? err.code : 500;
  err.message = err.message ? err.message : 'Internal Error!';

  res.status(err.code).send({ error: err });

}
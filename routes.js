
// TODO: build the names from either a config file or 
// by reading the file names in the controllers directory

var routeNames = [
    { 
      uri: '', 
      controller: 'main' 
    },
    'users'
  ];

var setRoute = function (app, name)
{
  var uri, controller, type;
  type = typeof name;

  switch (type)
  {
    case 'string':
      uri = controller = name;
      break;
    case 'object':
      uri = name.uri;
      controller = name.controller;
      break;
    default:
      return;
  }

  app.use(`/${uri}`, require(__dirname+`/controllers/${controller}.js`));

  console.log(`  using [${controller}.js] at "/${uri}"`);
}

Routes = {}

Routes.run = function (app) 
{
  console.log('routes:');

  for ( i = 0; i < routeNames.length; i++ ) setRoute(app, routeNames[i]);
}

module.exports = Routes;

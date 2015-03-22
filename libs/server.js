var restify      = require('restify');
var config       = GLOBAL.config;

function Server(){
  var server = restify.createServer();
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());
  
  server.post('/', debugPrint);
  
  server.listen(config.server.port, '');
  return server;

  function debugPrint(req, res, next){
    console.log('===============================');
    console.log('=========== HEADER ============');
    console.log(req.headers);
    console.log('=========== PARAMS ============');
    console.log(req.params);
    res.send(200);
    return next();
  }

}

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Server();
  }
  return instance;
}());

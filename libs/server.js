var restify      = require('restify');
var config       = GLOBAL.config;
var log        = require('logule').init(module);

function Server(){
  var server = restify.createServer();
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());
  
  server.post('/', debugPrint);
  
  server.listen(config.server.port, '');
  return server;

  function debugPrint(req, res, next){
    log.info(req.headers);
    log.info(req.params);
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

module.exports = function(github){
  var restify      = require('restify');
  var server       = restify.createServer();
  
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());
  
  server.post('/', github.fromGithub, debugPrint);
  
  server.listen(9003, '');
};

function debugPrint(req, res, next){
  console.log(req.headers);
  console.log(req.params);
};



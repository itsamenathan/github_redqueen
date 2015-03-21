var util         = require('util');
var EventEmitter = require('events').EventEmitter;
var log          = require('logule').init(module);

function Github(){
  var self = this;
 
  // Check if request is from github, should check IP's or secret!
  this.request = function(req, res, next){
    if ( req.headers['x-github-event'] ) { 
      respond(req, res); 
    }
    else {
      res.send(403);
      return next();
    }
    return next();
  };

  // emit all types of events, and each event.
  var respond = function(req, res) {
      if ( req.headers['x-github-event'] ){
        log.info(req.params);
        self.emit('all', req);
        self.emit(req.headers['x-github-event'], req);
        
      }
      else {
        res.send(400);
        return next();
      }
      res.send(200);
      return next();
  };
}

util.inherits(Github, EventEmitter);

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Github();
  }
  return instance;
}());

var util         = require('util');
var EventEmitter = require('events').EventEmitter;

var Github = function(){
  var self = this;
 
  // emit all types of events, and each event.
  function respond(req, res) {
      if ( req.headers['x-github-event'] ){
        self.emit('all', req);
        self.emit(req.headers['x-github-event'], req);
      }
      else {
        res.send(400);
        return next();
      }
      res.send(200);
      return next();
  }

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
  }
  
}

util.inherits(Github, EventEmitter);
module.exports = Github;

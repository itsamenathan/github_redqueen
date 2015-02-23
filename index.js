var util       = require('util');
var Github     = require('./github.js');
var rq         = require('./redqueen.js');
var gitio      = require('gitio2');

var github = new Github();
var server = require('./server.js')(github);

var push = {};
github.on('push', function(req){
  console.log(req.params);

  var payload   = req.params;
  push.pusher = payload.pusher.name;
  push.repo = payload.repository.full_name;
  push.channel = payload.channel;
  push.commitmsg = payload.head_commit.message;
  push.numcommits = payload.commits.length;

  gitio(payload.compare, print);

});

github.on('ping', function(req){
  var payload = req.params;
  var msg = util.format("Now monitoring %s for changes.", payload.repository.full_name);
  console.log(msg);
  rq.toIrc(msg, '##rqtest');
});

function print(err, shorturl){
   if ( push.numcommits > 1 ) {
     var msg = util.format("Detected %s changes to %s from user %s.  Latest Reason: '%s' - %s", push.numcommits, push.repo, push.pusher, push.commitmsg, shorturl);
   }
   else {
     var msg = util.format("Detected change to %s from user %s.  Reason: '%s' - %s", push.repo, push.pusher, push.commitmsg, shorturl);
    }
   console.log(msg);
   rq.toIrc(msg, '##rqtest');
}



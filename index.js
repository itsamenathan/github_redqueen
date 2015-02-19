var util       = require('util');
var Github = require('./github.js');
var rq = require('./redqueen.js');
var gitio = require('gitio2');

var github = new Github();
var server = require('./server.js')(github);

var pusher;
var repo;
var url;    
var compare;
var commitmsg;

github.on('push', function(req){
  //console.log(req.params);

  var payload   = req.params;

  pusher    = payload.pusher.name;
  repo      = payload.repository.full_name;
  url       = payload.head_commit.url;
  commitmsg = payload.head_commit.message;
  gitio(url, print);
});

function print(err, shorturl){
   var msg = util.format("Detected change to %s from user %s.  Reason: '%s' - %s", repo, pusher, commitmsg, shorturl);
   console.log(msg);
   rq.toIrc(msg);
}



var util = require('util');
var gitio = require('gitio2');
var gith = require('gith').create( 9003 );
var rq = require('./redqueen.js');

var pusher;
var repo;
var url;    
var compare;
var commitmsg;

gith({
}).on( 'all', function( payload ) {
  // ignore initial hooks ping
  if ( ! payload.sha ) { return; }
    console.log(payload);
    pusher    = payload.pusher;
    repo      = payload.repo;
    url       = payload.urls.head;
    commitmsg = payload.original.head_commit.message.replace(/\+/g, " ");

    gitio(url, print);

});


function print(err, shorturl){
   var msg = util.format("Detected change to %s from user %s.  Reason: '%s' - %s", repo, pusher, commitmsg, shorturl);
   console.log(msg);
   rq.toIrc(msg);
}

var argv = require('minimist')(process.argv.slice(2));

if ("config" in argv) {
    GLOBAL.config = require(argv.config);
    console.log("Loading custom config: " + argv.config);
}
else {
    GLOBAL.config = require('./config.js');
    console.log('Loading default config.');
}

var githubhooks     = require('./libs/github_hooks.js');

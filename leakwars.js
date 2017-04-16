
var casper = require('casper').create();
phantom.injectJs('scripts/helper.js');
phantom.injectJs('scripts/fight.js');
var links;
var nbFights = 10;
var name = 'name', password = 'password';

casper.start('https://leekwars.com/login', function() {
  this.waitForSelector('#login-button', function() {
    if(this.getCurrentUrl() == "https://leekwars.com/login") {
      this.echo(this.getCurrentUrl());
      login();
    } else {
      this.echo(this.getCurrentUrl());
      this.echo("Alreay connected or error");
    }
  });
});

casper.then(function() {
  this.wait(1000, function() {
    this.echo(this.getCurrentUrl());
  });
  this.wait(250, function() {
    for(var i = 0; i < nbFights; i++) {
      fight();
    }
  });
});

casper.then(function() {
  this.wait(1000, function() {
    logout();
  });
});

casper.run();

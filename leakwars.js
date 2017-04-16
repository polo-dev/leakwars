
var casper = require('casper').create();
phantom.injectJs('scripts/helper.js');
phantom.injectJs('scripts/fight.js');
phantom.injectJs('env.js');

var nbFights = 5; //or use nbFightsLeft();

var myLeek = 'notEvenClose';
//def in env.js
//var name = 'name', password = 'password';

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
    var nbFightsLeft = this.getHTML("span#farmer-fights");
    console.log("fights to do : " + nbFightsLeft);
    for(var i = 0; i < nbFightsLeft; i++) {
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

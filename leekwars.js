
var casper = require('casper').create();
phantom.injectJs('scripts/helper.js');
phantom.injectJs('scripts/fight.js');
phantom.injectJs('env.js');

//var myLeek = 'notEvenClose';

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
    if(allFight)
        nbFights = this.getHTML("span#farmer-fights");

    var nbFightsByLeek = Math.round(nbFights/myLeeks.length);
    console.log("fights to do : " + nbFights);
    console.log('nbFightsByLeek : ' + nbFightsByLeek);

    var y = 0, u = 0; //first leek and increment
    var leek = myLeeks[y];
    for(var i = 1; i <= nbFights; i++) {
      this.wait(250, function() {
        u++;
        if(nbFightsByLeek == u) {
          nbFightsByLeek += u;
          y++;
          leek = myLeeks[y]
          console.log("Changement de poireau : " +leek);
        }
          fight(leek);
      })
    }
  });
});

casper.then(function() {
  this.wait(1000, function() {
    logout();
  });
});

casper.run();

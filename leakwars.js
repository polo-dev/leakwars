
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

    var nbFightsByLeak = Math.round(nbFights/myLeaks.length);
    console.log("fights to do : " + nbFights);

    var y = 0; //first leak
    var leak = myLeaks[y];
    for(var i = 0; i < nbFights; i++) {
      this.wait(250, function() {
        if(nbFightsByLeak === i) {
          nbFightsByLeak += i;
          y++;
          leak = myLeaks[y]
          console.log("Change de poireau : " +leak);
        }
          fight(leak);
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

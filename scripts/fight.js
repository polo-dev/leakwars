function goToGarden() {
  casper.thenOpen('https://leekwars.com/garden', function() {
    this.waitForSelector('.enemies .opponents .leek', function() {
      this.echo(this.getCurrentUrl());
      //require('utils').dump(this.getElementsAttribute('div[class="leek"]', 'leek'));
    });
  });
}

function nbFightsLeft() {
  casper.then(function() {
    this.waitForSelector('#farmer-fights', function() {
      this.echo(this.exists('#farmer-fights'));
      return this.fetchText('#farmer-fights');
    });
  })
}

function fight() {
  casper.then(function() {
    goToGarden();
    var leeks = this.getElementsAttribute('div[class="leek"]', 'leek');
    this.click('div[leek="'+leeks[0]+'"]');
    console.log("test fight to : " + leeks[0]);
    this.wait(2000);
  });
}

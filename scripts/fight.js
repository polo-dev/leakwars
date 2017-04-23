function goToGarden() {
  casper.thenOpen('https://leekwars.com/garden', function() {
    this.waitForSelector('.enemies .opponents .leek', function() {
      //this.echo(this.getCurrentUrl());
      //require('utils').dump(this.getElementsAttribute('div[class="leek"]', 'leek'));
    });
  });
}

function nbFightsLeft() {
  casper.waitForSelector('#farmer-fights', function() {
    this.echo(this.getHTML("span#farmer-fights"));
    return this.getHTML("span#farmer-fights");
  });
}

//on garden page, select your leek
function chooseLeekToFight(leak) {
    casper.click('div[name="'+leak+'"]');
}

function fight(leak) {
  casper.then(function() {
    goToGarden();
    this.wait(250, function() {
      chooseLeekToFight(leak);
      var leeks = this.getElementsAttribute('div[class="leek"]', 'leek');
      this.click('div[leek="'+leeks[0]+'"]');
      console.log("test fight to : " + leeks[0]);
      this.wait(1000);
    });
  });
}

function login() {
  casper.waitForSelector("form input[name='login']", function() {
    this.fill('form#login-form', {
      'login' : name,
      'password' : password
    }), true;
    this.click('input.button');
    console.log('login');
  });
}

function logout() {
    casper.thenOpen('https://leekwars.com/settings', function() {
      this.waitForSelector('#logout', function() {
        this.echo('settings : ' + this.getCurrentUrl());
        this.echo("name : " + this.getHTML("span.farmer-name"));
        this.click('div#logout');
        this.wait(1000, function() {
          this.echo('déconnected : ' + this.getCurrentUrl());
        });
      });
  });
};

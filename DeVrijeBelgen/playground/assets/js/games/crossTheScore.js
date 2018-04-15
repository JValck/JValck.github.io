// create a new scene named "Game"
var gameScene = new Phaser.Scene('Game');

var w = document.body.clientWidth;
var h = document.body.clientHeight;
// our game's configuration
var config = {
  type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
  width: w, // game width
  height: h, // game height
  scene: gameScene // our newly created scene
};

// create the game, and pass it the configuration
var game = new Phaser.Game(config);

gameScene.gameOver = function(){
  // fade camera
  this.cameras.main.fade(250);

  // restart game
  this.time.delayedCall(250, function() {
    this.scene.manager.bootScene(this);
  }, [], this);

  // reset camera effects
  this.time.delayedCall(350, function() {
    this.cameras.main.resetFX();
  }, [], this);
}

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
gameScene.init = function() {
  this.playerSpeed = 1.5 * (w / 600);
  this.enemySpeed = 2 * (h / 400);
  this.enemyMaxY = 400 * (h / 400);
  this.enemyMinY = 80 * (h / 400);
}

// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', '../../assets/img/games/crossTheScore/background.png');
  this.load.image('player', '../../assets/img/games/shared/hele-noot-ogen.png');
  this.load.image('rest', '../../assets/img/games/shared/kwart-rust-ogen-kwaad.png');
};

// executed once, after assets were loaded
gameScene.create = function() {
  this.gameActive = true;
  // background
  var bg = this.add.sprite(0, 0, 'background');

  // change origin to the top-left of the sprite
  bg.setOrigin(0,0);
  bg.setScale(w/bg.width, h/bg.height);

  // player x=70
  this.player = this.add.sprite(70, this.sys.game.config.height / 2, 'player');
  // scale down
  this.player.setScale(w / 1000);

  // group of enemies
  this.enemies = this.add.group({
    key: 'rest',
    repeat: 5,
    setXY: {
      x: 120 * (w / 600),
      y: 100 * (h / 400),
      stepX: 90 * (w / 600),
      stepY: 20 * (h / 400)
    },
  });
  // scale enemies
  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);
  // set speeds enemies
  Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
    enemy.speed = Math.random() * 2 + 1;
  }, this);
};

// executed on every frame (60 times per second)
gameScene.update = function() {
  if (!this.gameActive) {
    return;
  }

  // check for active input
  if (this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  //check win
  if(this.sys.game.config.width <= this.player.x){
    this.gameOver();
  }

  // enemy movement
  var enemies = this.enemies.getChildren();
  var numEnemies = enemies.length;

  for (var i = 0; i < numEnemies; i++) {
    // move enemies
    enemies[i].y += enemies[i].speed;
    // reverse movement if reached the edges
    if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
      enemies[i].speed *= -1;
    } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
      enemies[i].speed *= -1;
    }
    // enemy collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
      this.gameOver();
      break;
    }
  }
};

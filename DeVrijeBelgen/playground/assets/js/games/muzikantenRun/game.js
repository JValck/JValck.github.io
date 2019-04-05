// global game options
var gameOptions = {
  platformStartSpeed: 350,
  playerGravity: 900,

  playerStartPosition: 200,
  jumps: 2
}

// playGame scene
class Game extends Phaser.Scene{
  constructor(){
    super("Game");
  }
  preload(){
    this.load.image('trumpet', '../../../../assets/img/games/muzikantenRun/trpt.jpg')
    this.load.image("platform", "../../../../assets/img/games/muzikantenRun/platform.png");

    this.load.image("a", "../../../../assets/img/games/muzikantenRun/a.png");
    this.load.image("b", "../../../../assets/img/games/muzikantenRun/b.png");
    this.load.image("c", "../../../../assets/img/games/muzikantenRun/c.png");
    this.load.image("d", "../../../../assets/img/games/muzikantenRun/d.png");
    this.load.image("e", "../../../../assets/img/games/muzikantenRun/e.png");
    this.load.image("f", "../../../../assets/img/games/muzikantenRun/f.png");
    this.load.image("g", "../../../../assets/img/games/muzikantenRun/g.png");
    this.load.image("h", "../../../../assets/img/games/muzikantenRun/h.png");
    this.load.image("i", "../../../../assets/img/games/muzikantenRun/i.png");
    this.load.image("j", "../../../../assets/img/games/muzikantenRun/j.png");
    this.load.image("k", "../../../../assets/img/games/muzikantenRun/k.png");
    this.load.image("l", "../../../../assets/img/games/muzikantenRun/l.png");
    this.load.image("m", "../../../../assets/img/games/muzikantenRun/m.png");
    this.load.image("n", "../../../../assets/img/games/muzikantenRun/n.png");
    this.load.image("o", "../../../../assets/img/games/muzikantenRun/o.png");
    this.load.image("p", "../../../../assets/img/games/muzikantenRun/p.png");
    this.load.image("q", "../../../../assets/img/games/muzikantenRun/q.png");
    this.load.image("r", "../../../../assets/img/games/muzikantenRun/r.png");
    this.load.image("s", "../../../../assets/img/games/muzikantenRun/s.png");
    this.load.image("t", "../../../../assets/img/games/muzikantenRun/t.png");
    this.load.image("u", "../../../../assets/img/games/muzikantenRun/u.png");
    this.load.image("v", "../../../../assets/img/games/muzikantenRun/v.png");
    this.load.image("w", "../../../../assets/img/games/muzikantenRun/w.png");
    this.load.image("x", "../../../../assets/img/games/muzikantenRun/x.png");
    this.load.image("y", "../../../../assets/img/games/muzikantenRun/y.png");
    this.load.image("z", "../../../../assets/img/games/muzikantenRun/z.png");

    this.load.image("1", "../../../../assets/img/games/muzikantenRun/1.png");
    this.load.image("2", "../../../../assets/img/games/muzikantenRun/2.png");
    this.load.image("3", "../../../../assets/img/games/muzikantenRun/3.png");
    this.load.image("4", "../../../../assets/img/games/muzikantenRun/4.png");
    this.load.image("5", "../../../../assets/img/games/muzikantenRun/5.png");
    this.load.image("6", "../../../../assets/img/games/muzikantenRun/6.png");
    this.load.image("7", "../../../../assets/img/games/muzikantenRun/7.png");
    this.load.image("8", "../../../../assets/img/games/muzikantenRun/8.png");

    this.load.image("player", "../../../../assets/img/games/muzikantenRun/logo.png");
  }

  init(){
    this.jumpForce = this.cameras.main.height;
  }

  create(){
    this.background = this.add.image(0, 0, 'trumpet').setOrigin(0,0).setScale(1.1);

    this.muzikantenGroup = this.add.group({
      removeCallback: function(platform){
        platform.scene.muzikantenPool.add(platform)
      }
    });
    this.muzikantenPool = this.add.group({
      removeCallback: function(platform){
        platform.scene.muzikantenGroup.add(platform)
      }
    });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    //muzikanten names
    this.allMusicians = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8"];
    this.currentMusician = 0;

    // adding the player;
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.cameras.main.height / 2, "player").setScale(0.1);
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setCollideWorldBounds(true);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.muzikantenGroup);

    this.addMuzikant();


    // checking for input
    this.input.on("pointerdown", this.jump, this);
  }

  addMuzikant(){
    var muzikantName = this.allMusicians[this.currentMusician];
    var muzikant = this.physics.add.sprite(this.cameras.main.width, game.config.height, muzikantName).setOrigin(0,1);
    muzikant.setImmovable(true);
    muzikant.setScale(2);
    muzikant.setVelocityX(gameOptions.platformStartSpeed * -1);
    this.muzikantenGroup.add(muzikant);
    if(this.allMusicians.length-1 === this.currentMusician){
      this.currentMusician = 0;
    }else{
      this.currentMusician++;
    }
    this.nextMuzikantDistance = Phaser.Math.Between(muzikant.displayWidth+this.player.displayWidth, this.cameras.main.width);
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump(){
    if(this.player.body.blocked.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
      if(this.player.body.blocked.down){
        this.playerJumps = 0;
      }
      this.player.setVelocityY(this.jumpForce * -1);
      this.playerJumps ++;
    }
  }

  update(){
    this.player.x = gameOptions.playerStartPosition;

    // recycling platforms
    var minDistance = this.cameras.main.width;
    this.muzikantenGroup.getChildren().forEach(function(platform){
      var platformDistance = this.cameras.main.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if(platform.x < - platform.displayWidth / 2){
        this.muzikantenGroup.killAndHide(platform);
        this.muzikantenGroup.remove(platform);
      }
    }, this);

    console.log(minDistance, this.nextMuzikantDistance);
    // adding new platforms
    if(minDistance > this.nextMuzikantDistance){
      this.addMuzikant();
    }
  }
};

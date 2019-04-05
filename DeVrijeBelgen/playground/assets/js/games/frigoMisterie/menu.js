class Menu extends Phaser.Scene {

  constructor ()
  {
    super({
      key: 'menu',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
    });
    this.gravity = 300;
    this.defaultGravity = 300;
    this.score = 0;
    this.missers = 0;
    this.frigoInterval = 2000;
    this.defaultFrigoInterval = 2000;
    this.gameOver = false;
    this.resetAfter = 0;
  }

  preload ()
  {
    this.load.image('background', '../../../../assets/img/games/frigoMisterie/background.jpg');
    this.load.image('bom', '../../../../assets/img/games/frigoMisterie/bom.png');
    this.load.image('frigo', '../../../../assets/img/games/frigoMisterie/frigo_willy.png');
    this.load.image('klok', '../../../../assets/img/games/frigoMisterie/klok.png');
    this.load.image('box', '../../../../assets/img/games/frigoMisterie/box.png');
    this.load.image('roos', '../../../../assets/img/games/frigoMisterie/roos.png');
  }

  create ()
  {
    this.background = this.add.image(0, 0, 'background').setOrigin(0,0);


    this.box = this.physics.add.image(100, 200, 'box').setOrigin(0,0).setScale(0.6);
    this.box.setActive(false).setVisible(false);
    this.klok = this.physics.add.image(100, 200, 'klok').setOrigin(0,0).setScale(0.6);
    this.klok.setActive(false).setVisible(false);

    this.roos = this.physics.add.image(400, 300, 'roos').setOrigin(0.5,0.5).setScale(0.2);
    this.roos.body.setAllowGravity(false);
    this.physics.add.overlap(this.roos, this.klok, this.klokGeraakt, null, this);

    this.input.on('pointermove', function (pointer) {
      this.roos.x = pointer.x;
      this.roos.y = pointer.y;
    }, this);

    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    this.missersText = this.add.text(this.cameras.main.width-20, 16, 'Missers: 0', { fontSize: '32px', fill: '#FFF' });

    this.bottom_collider = new Phaser.Physics.Arcade.Sprite(this,0,this.cameras.main.height,).setOrigin(0, 0);
    //no idea if it is necessary
    this.bottom_collider.width = this.cameras.main.width;
    //add to scene
    this.add.existing(this.bottom_collider);
    //add to physics
    this.physics.add.existing(this.bottom_collider,true);
    //set the physics body width/height to accommodate your desired size
    this.bottom_collider.body.width = this.cameras.main.width;

    var button = this.add.image(this.cameras.main.width-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
    button.on('pointerup', function () {
        if (this.scale.isFullscreen)
        {
            button.setFrame(0);
            this.scale.stopFullscreen();
        }
        else
        {
            button.setFrame(1);
            this.scale.startFullscreen();
        }
    }, this);

    this.time.delayedCall(Math.random()*this.frigoInterval, this.spawnFrigo, [], this);
    this.time.delayedCall(Math.random()*this.frigoInterval, this.spawnRandom, [], this);
  }

  update() {
    this.scoreText.setText('Score: '+this.score);
    this.missersText.setText('Missers: '+this.missers);
    if(this.gameOver){
      //this.scene.start('gameOver');
    }
  }

  spawnRandom(){
    var random = Math.floor(Math.random()*8);
    switch (random) {
      case 0:
      this.spawnBomb();
      break;
      case 1:
      this.spawnClock();
      break;
      case 2:
      this.spawnBox();
      break;
      default:
      this.spawnFrigo();
      break;
    }
    this.time.delayedCall(Math.random()*this.frigoInterval, this.spawnRandom, [], this);
    if(this.resetAfter > 0) this.resetAfter--;
    if(this.resetAfter <= 0){
      this.resetGameParams();
    }
  }

  resetGameParams(){
    this.gravity = this.defaultGravity;
    this.frigoInterval = this.defaultFrigoInterval;
    this.resetAfter = 0;
  }

  randomSpawnX(){
    return Math.floor(Math.random()*(this.sys.game.canvas.width - 200));
  }

  randomVelocityY(sprite){
    var random = (this.gravity + (Math.random()*(this.sys.game.canvas.height/2)));
    return (random % this.sys.game.canvas.height)*-1;
  }

  randomVelocityX(xPos){
    var will = Math.random()*(this.gravity/3);
    return (xPos > (this.sys.game.canvas.width/2)) ? (-1*will):will;
  }

  spawnFrigo(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'frigo')/*.setOrigin(0,0)*/.setScale(0.15);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY(nieuweFrigo)).setGravity(0, this.gravity);
    this.physics.add.overlap(this.roos, nieuweFrigo, this.frigoGeraakt, null, this);
    this.physics.add.overlap(this.bottom_collider, nieuweFrigo, this.outOfWorld, null, this);
  }

  spawnBomb(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'bom')/*.setOrigin(0,0)*/.setScale(0.5);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY(nieuweFrigo)).setGravity(0, this.gravity);
    this.physics.add.overlap(this.roos, nieuweFrigo, this.bomGeraakt, null, this);
  }

  spawnClock(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'klok')/*.setOrigin(0,0)*/.setScale(0.5);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY(nieuweFrigo)).setGravity(0, this.gravity);
    this.physics.add.overlap(this.roos, nieuweFrigo, this.klokGeraakt, null, this);
  }

  spawnBox(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'box')/*.setOrigin(0,0)*/.setScale(0.5);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY(nieuweFrigo)).setGravity(0, this.gravity);
    this.physics.add.overlap(this.roos, nieuweFrigo, this.boxGeraakt, null, this);
  }

  bomGeraakt(roos, bom) {
    bom.disableBody(true, true);
    this.gameOver = true;
  }

  klokGeraakt(roos, klok) {
    klok.disableBody(true, true);
    this.resetAfter += 10;
    this.gravity = this.gravity/2;
  }

  frigoGeraakt(roos, frigo) {
    frigo.disableBody(true, true);
    this.score++;
  }

  boxGeraakt(roos, box){
    box.disableBody(true, true);
    if(Math.random() > 0.5){
      this.resetGameParams();
      this.score += 10;
    }else{
      this.frigoInterval -= 350;
      this.resetAfter += 5
      console.log("frigo");
    }

  }

  outOfWorld(bottom, frigo){
    if(frigo.body.velocity.y > 0){//moving down
      var output;
      var topLeft = frigo.getTopLeft(output).y;
      var topRight = frigo.getTopRight(output).y;
      var lastVisibleCorner = (topLeft > topRight) ? topLeft : topRight;
      if(this.sys.game.canvas.height < lastVisibleCorner){
        frigo.disableBody(true, true);
        this.missers++;
        if(this.missers === 3){
          this.gameOver = true;
        }
      }
    }
  }

}

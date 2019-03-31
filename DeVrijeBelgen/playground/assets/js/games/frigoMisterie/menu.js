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
    this.frigoInterval = 2000;
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

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });


    this.time.delayedCall(Math.random()*this.frigoInterval, this.spawnFrigo, [], this);
    //this.time.delayedCall(Math.random()*this.frigoInterval, this.spawnRandom, [], this);

    this.physics.world.on('worldbounds', this.outOfWorld);
  }

  update() {
    this.scoreText.setText('Score: '+this.score);

  }

  spawnRandom(){
    var random = Math.floor(Math.random()*4);
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
  }

  randomSpawnX(){
    return Math.floor(Math.random()*(this.sys.game.canvas.width - 200));
  }

  randomVelocityY(){
    return -1 * (this.gravity + (Math.random()*this.gravity));
  }

  randomVelocityX(xPos){
    var will = Math.random()*100;
    return (xPos > (this.sys.game.canvas.width/2)) ? (-1*will):will;
  }

  spawnFrigo(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'frigo')/*.setOrigin(0,0)*/.setScale(0.15);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY()).setGravity(0, this.gravity);    
    this.physics.add.overlap(this.roos, nieuweFrigo, this.frigoGeraakt, null, this);
  }

  spawnBomb(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'bom')/*.setOrigin(0,0)*/.setScale(0.5);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY()).setGravity(0, this.gravity);
    this.physics.add.overlap(this.roos, nieuweFrigo, this.bomGeraakt, null, this);
  }

  spawnClock(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'klok')/*.setOrigin(0,0)*/.setScale(0.5);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY()).setGravity(0, this.gravity);
    this.physics.add.overlap(this.roos, nieuweFrigo, this.klokGeraakt, null, this);
  }

  spawnBox(){
    var x = this.randomSpawnX();
    var nieuweFrigo = this.physics.add.image(x, this.sys.game.canvas.height, 'box')/*.setOrigin(0,0)*/.setScale(0.5);
    nieuweFrigo.body.setVelocity(this.randomVelocityX(x), this.randomVelocityY()).setGravity(0, this.gravity);
    this.physics.add.overlap(this.roos, nieuweFrigo, this.boxGeraakt, null, this);
  }

  bomGeraakt(roos, bom) {
    bom.disableBody(true, true);
  }

  klokGeraakt(roos, klok) {
    klok.disableBody(true, true);
  }

  frigoGeraakt(roos, frigo) {
    frigo.disableBody(true, true);
    this.score++;
  }

  boxGeraakt(roos, box){
    box.disableBody(true, true);
    this.score += 10;
  }

  outOfWorld(){
    console.log("fire");
  }

}

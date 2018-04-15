var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
      default:"arcade",
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var scrollSpeed = 3;
var appendScrollItemBreakpoint = 5;
var gameIsActive = true;
var janMargin = 120;//orginial head only: 90
var newPipeWhenLastLowerThan = 400;
var score = 0;

function preload ()
{
  this.load.image('jan', '../../assets/img/games/flappyJan/jan_met_lijf.png');
  this.load.image('base', '../../assets/img/games/flappyJan/base.png');
  this.load.image('background', '../../assets/img/games/flappyJan/background.png');
  this.load.image('pipe', '../../assets/img/games/flappyJan/pipe-green.png');
  this.load.image('0', '../../assets/img/games/flappyJan/0.png');
  this.load.image('1', '../../assets/img/games/flappyJan/1.png');
  this.load.image('2', '../../assets/img/games/flappyJan/2.png');
  this.load.image('3', '../../assets/img/games/flappyJan/3.png');
  this.load.image('4', '../../assets/img/games/flappyJan/4.png');
  this.load.image('5', '../../assets/img/games/flappyJan/5.png');
  this.load.image('6', '../../assets/img/games/flappyJan/6.png');
  this.load.image('7', '../../assets/img/games/flappyJan/7.png');
  this.load.image('8', '../../assets/img/games/flappyJan/8.png');
  this.load.image('9', '../../assets/img/games/flappyJan/9.png');
}

function create ()
{
  this.background = this.add.group({
    key: 'background',
    repeat: 4,
    setXY: {
      x: 0,
      y: 256,
      stepX: 288,
      stepY: 0
    },
  });
  this.pipes = this.physics.add.group();
  this.ground = this.physics.add.group({
    key: 'base',
    repeat: 4,
    setXY: {
      x: 0,
      y: 550,
      stepX: 336,
      stepY: 0
    },
  });
  this.jan = this.physics.add.image(100, 300, 'jan').setOrigin(0,0).setScale(0.25).setGravity(0, 200);//scale only head: 0.1
  this.janHeight = this.jan.height * this.jan.scaleY;
  this.dummyPipe = this.physics.add.image(-500,0, 'pipe');

  this.score = this.physics.add.group();

  //  Collide the player and the stars with the platforms
  this.physics.add.overlap(this.jan, this.ground, hit, null, this);
  this.physics.add.overlap(this.jan, this.pipes, hit, null, this);

  this.time.delayedCall(250, function() {
    addPipe(this);
  }, [], this);
  displayUpdatedScore(this);
  this.add.text(80, 580, 'Tik of klik op het speelveld om Jan de lucht in te katapulteren.', { fontSize: '15px', fill: '#000' });
}

function update ()
{
  if(gameIsActive){
    if (this.input.activePointer.isDown) {
      this.jan.setVelocity(0, -200);
    }
    scrollBackground(this);
    scrollGround(this);
    scrollPipes(this);
    if(this.jan.y <= 0){
      hit();
    }
  }else{
     if(this.input.activePointer.isDown){
       location.reload(true);
    }
  }
}

function scrollBackground(currentGame){
  for (var i = 0; i < currentGame.background.getChildren().length; i++) {
    var current = currentGame.background.getChildren()[i];
    current.x -= scrollSpeed;
    if((current.x + current.width) <= appendScrollItemBreakpoint){
      current.x = current.width * (currentGame.background.getChildren().length-1);
    }
  }
}

function scrollGround(currentGame){
  for (var i = 0; i < currentGame.ground.getChildren().length; i++) {
    var current = currentGame.ground.getChildren()[i];
    current.x -= scrollSpeed;
    if((current.x + current.width) <= appendScrollItemBreakpoint){
      current.x = current.width * (currentGame.ground.getChildren().length-1);
    }
  }
}

function scrollPipes(currentGame){
  var scoreAdded = false;
  for (var i = currentGame.pipes.getChildren().length-1; i > -1; i--) {
    var current = currentGame.pipes.getChildren()[i];
    current.x -= scrollSpeed;
    if((current.x + current.width) <= appendScrollItemBreakpoint){
      currentGame.pipes.remove(current);
    }
    //only verify last
    if((i+1) == currentGame.pipes.getChildren().length && (current.x + current.width) < newPipeWhenLastLowerThan){
      addPipe(currentGame);
      newPipeAdded = true;
    }
    if(i % 2 == 0 && ((typeof current.scored === 'undefined') || current.scored === false) && (current.x + current.width) < currentGame.jan.x){
      score++;
      current.scored = true;
      displayUpdatedScore(currentGame);
    }
  }
}

function addPipe(currentGame){
  var random = (-currentGame.dummyPipe.height/3) + Math.floor(Math.random() * (currentGame.dummyPipe.height/2));
  var top = currentGame.pipes.create(currentGame.sys.game.canvas.width + 10, random, 'pipe');
  top.setAngle(180);
  //bottom
  var yBottom = top.height + currentGame.janHeight + janMargin + random;
  currentGame.pipes.create(currentGame.sys.game.canvas.width + 10, yBottom, 'pipe');
}

function displayUpdatedScore(currentGame) {
  currentGame.score.clear(true);
  var scoreParts = (score+"").split("");
  var halfScreen = currentGame.sys.game.canvas.width / 2;
  console.log(scoreParts);
  for(var i = 0; i < scoreParts.length; i++){
    currentGame.score.create(halfScreen + (24*i), 50, scoreParts[i]);
  }
}

function hit(){
  gameIsActive = false;
}

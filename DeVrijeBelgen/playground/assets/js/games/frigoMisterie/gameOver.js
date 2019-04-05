class GameOver extends Phaser.Scene {

  constructor ()
  {
    super({
      key: 'gameOver',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
    });
  }

  init(data){
    this.score = data.score;
  }

  preload ()
  {
    this.load.image('background', '../../../../assets/img/games/frigoMisterie/background.jpg');
  }

  create ()
  {
    this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
    this.background.setScale(2/scaleRatio);
    this.scoreText = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2, 'Misterieuze score: '+this.score+" frigo's", { fontSize: (28* window.devicePixelRatio)+'px', fill: '#FFF', wordWrap: {
        width: this.cameras.main.width}
    });
    this.scoreText.x = (this.cameras.main.width/2) - (this.scoreText.width/2);
    this.herstarten = this.add.text(this.cameras.main.width/2, (this.cameras.main.height/2)+this.scoreText.height, 'Opnieuw', { fontSize: (28* window.devicePixelRatio)+'px', fill: '#FFF' });
    this.input.on('pointerdown', function (pointer) {
      this.scene.start('menu');
    }, this);
  }

  update() {

  }

}

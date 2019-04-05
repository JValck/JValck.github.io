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
  }

  preload ()
  {
    this.load.image('background', '../../../../assets/img/games/frigoMisterie/background.jpg');
    this.load.image('starten', '../../../../assets/img/games/frigoMisterie/menu.png');
  }

  create ()
  {
    this.background = this.add.image(0, 0, 'background').setOrigin(0,0);
    this.background.setScale(2/scaleRatio);
    this.starten = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, 'starten');
    this.input.on('pointerdown', function (pointer) {
      this.scene.start('game');
    }, this);
  }

  update() {

  }

}

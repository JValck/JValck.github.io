var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  physics: {
    default: "arcade"
  },
  //parent: 'phaser-example',
  scene: [Game]
};

var game = new Phaser.Game(config);

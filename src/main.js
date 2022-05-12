import Phaser from './lib/phaser.js'
import SwordAttackScene from './scenes/SwordAttackScene.js'

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: [SwordAttackScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scale: {
    zoom: 1.5,
  },
}

export default new Phaser.Game(config)

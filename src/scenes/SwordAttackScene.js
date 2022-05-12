import Phaser from '../lib/phaser.js'

export default class SwordAttackScene extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  knight

  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors

  /** @type {Phaser.Physics.Arcade.StaticGroup} */
  zombies

  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors

  constructor() {
    super('sword-attack')
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.atlas(
      'knight',
      '../../assets/knight/knight.png',
      '../../assets/knight/knight.json',
    )

    this.load.image('zombie', '../../assets/zombie/zombie_standing.png')
  }

  create() {
    const { width, height } = this.scale
    this.knight = this.physics.add.sprite(
      width / 8,
      height / 2,
      'knight',
      'Idle (1).png',
    )
    this.knight.setBodySize(this.knight.width * 0.4, this.knight.height * 0.85)
    this.knight.setCollideWorldBounds(true)

    this.createAnimations()
    this.knight.play('idle')

    this.zombies = this.physics.add.staticGroup()

    for (let i = 1; i <= 20; i++) {
      const x = Phaser.Math.FloatBetween(500, 1100)
      const y = Phaser.Math.FloatBetween(50, 550)

      /**@type {Phaser.Physics.Arcade.Sprite} */
      const zombieGroup = this.zombies.create(x, y, 'zombie')
      zombieGroup.scale = 0.7

      /**@type {Phaser.Physics.Arcade.StaticBody} */
      const zombieBody = zombieGroup.body
      zombieBody.updateFromGameObject()
    }

    this.physics.add.collider(this.knight, this.zombies)
  }

  update() {
    this.createKeyboardAnimation()
  }

  createKeyboardAnimation = () => {
    this.input.keyboard.on('keydown-RIGHT', () => {
      this.knight.anims.play('run')
      this.knight.flipX = false
      this.knight.setVelocityX(100)
      this.knight.setVelocityY(0)
    })

    this.input.keyboard.on('keydown-LEFT', () => {
      this.knight.anims.play('run')
      this.knight.setVelocityX(-100)
      this.knight.setVelocityY(0)
      this.knight.flipX = true
    })

    this.input.keyboard.on('keydown-DOWN', () => {
      this.knight.anims.play('run')
      this.knight.setVelocityY(100)
      this.knight.setVelocityX(0)
    })

    this.input.keyboard.on('keydown-UP', () => {
      this.knight.anims.play('run')
      this.knight.setVelocityY(-100)
      this.knight.setVelocityX(0)
    })

    this.input.keyboard.on('keydown-SPACE', () => {
      this.knight.anims.play('idle')
      this.knight.setVelocity(0)
    })

    this.input.keyboard.on('keydown-A', () => {
      this.knight.anims.play('attack')
    })

    this.input.keyboard.on('keyup-RIGHT', () => {
      this.knight.anims.play('idle')
      this.knight.setVelocityX(0)
    })

    this.input.keyboard.on('keyup-LEFT', () => {
      this.knight.anims.play('idle')
      this.knight.setVelocityX(0)
      this.knight.flipX = true
    })

    this.input.keyboard.on('keyup-DOWN', () => {
      this.knight.anims.play('idle')
      this.knight.setVelocityY(0)
    })

    this.input.keyboard.on('keyup-UP', () => {
      console.log()
      this.knight.anims.play('idle')
      this.knight.setVelocityY(0)
    })

    this.input.keyboard.on('keyup-A', () => {
      this.knight.anims.play('idle')
      this.knight.setVelocity(0)
    })
  }

  createAnimations = () => {
    this.knight.anims.create({
      key: 'idle',
      frames: this.knight.anims.generateFrameNames('knight', {
        start: 1,
        end: 10,
        prefix: 'Idle (',
        suffix: ').png',
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.knight.anims.create({
      key: 'run',
      frames: this.knight.anims.generateFrameNames('knight', {
        start: 1,
        end: 10,
        prefix: 'Run (',
        suffix: ').png',
      }),
      frameRate: 20,
      repeat: -1,
    })

    this.knight.anims.create({
      key: 'attack',
      frames: this.knight.anims.generateFrameNames('knight', {
        start: 1,
        end: 10,
        prefix: 'Attack (',
        suffix: ').png',
      }),
      frameRate: 60,
    })
  }
}

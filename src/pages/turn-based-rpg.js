import React from 'react'
import { withPrefix } from 'gatsby'
import styled from 'styled-components'
import Phaser from '../utils/PhaserLoader'
import PageWrapper from '../components/PageWrapper'

class TurnBasedRPGPage extends React.Component {
  componentDidMount() {
    this._createGame()
  }

  render() {
    return (
      <Wrapper>
        <Title>Turn-Based RPG</Title>

        <div id="game-root" />
      </Wrapper>
    )
  }

  _createGame = () => {
    class BootScene extends Phaser.Scene {
      constructor() {
        super('BootScene')
      }

      preload() {}

      create() {
        this.scene.start('WorldScene')
      }
    }

    class WorldScene extends Phaser.Scene {
      constructor() {
        super('WorldScene')
      }

      preload() {
        this.load.image(
          'tiles',
          withPrefix('/turn-based-rpg/assets/map/spritesheet.png')
        )
        this.load.tilemapTiledJSON(
          'map',
          withPrefix('/turn-based-rpg/assets/map/map.json')
        )
        this.load.spritesheet(
          'player',
          withPrefix('/turn-based-rpg/assets/RPG_assets.png'),
          { frameWidth: 16, frameHeight: 16 }
        )
      }

      create() {
        const map = this.make.tilemap({ key: 'map' })
        const tiles = map.addTilesetImage('spritesheet', 'tiles')
        const grass = map.createStaticLayer('Grass', tiles, 0, 0)
        const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0)
        obstacles.setCollisionByExclusion([-1])

        this.player = this.physics.add.sprite(50, 100, 'player', 6)
        this.physics.world.bounds.width = map.widthInPixels
        this.physics.world.bounds.height = map.heightInPixels
        this.player.setCollideWorldBounds(true)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player)
        this.cameras.main.roundPixels = true // A hack to prevent tiles bleeding – showing border lines on tiles

        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('player', {
            frames: [1, 7, 1, 13],
          }),
          frameRate: 10,
          repeat: -1,
        })
        this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('player', {
            frames: [1, 7, 1, 13],
          }),
          frameRate: 10,
          repeat: -1,
        })
        this.anims.create({
          key: 'up',
          frames: this.anims.generateFrameNumbers('player', {
            frames: [2, 8, 2, 14],
          }),
          frameRate: 10,
          repeat: -1,
        })
        this.anims.create({
          key: 'down',
          frames: this.anims.generateFrameNumbers('player', {
            frames: [0, 6, 0, 12],
          }),
          frameRate: 10,
          repeat: -1,
        })

        this.physics.add.collider(this.player, obstacles)

        this.spawns = this.physics.add.group({
          classType: Phaser.GameObjects.Zone,
        })
        for (let i = 0; i < 30; i++) {
          let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width)
          let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height)
          this.spawns.create(x, y, 20, 20)
        }
        this.physics.add.overlap(
          this.player,
          this.spawns,
          this.onMeetEnemy,
          false,
          this
        )
      }

      update(time, delta) {
        this.player.body.setVelocity(0)

        if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-80)
        } else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(80)
        }

        if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-80)
        } else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(80)
        }

        if (this.cursors.left.isDown) {
          this.player.anims.play('left', true)
          this.player.flipX = true
        } else if (this.cursors.right.isDown) {
          this.player.anims.play('right', true)
          this.player.flipX = false
        } else if (this.cursors.up.isDown) {
          this.player.anims.play('up', true)
        } else if (this.cursors.down.isDown) {
          this.player.anims.play('down', true)
        } else {
          this.player.anims.stop()
        }
      }

      onMeetEnemy(player, zone) {
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width)
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height)

        this.cameras.main.shake(300)
      }
    }

    const config = {
      type: Phaser.AUTO,
      parent: 'game-root',
      width: 320,
      height: 240,
      zoom: 2,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      scene: [BootScene, WorldScene],
    }

    const game = new Phaser.Game(config)
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: #222;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  padding: 10px 0;
  color: #ccc;
`

export default PageWrapper(TurnBasedRPGPage)

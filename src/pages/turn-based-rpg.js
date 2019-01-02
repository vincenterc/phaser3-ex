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

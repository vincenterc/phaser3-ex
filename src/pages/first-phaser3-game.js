import React from 'react'
import { withPrefix } from 'gatsby'
import styled from 'styled-components'
import Phaser from 'phaser'
import PageWrapper from '../components/PageWrapper'

class FirstPhaser3GamePage extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-root',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
    }

    const game = new Phaser.Game(config)

    function preload() {
      this.load.image('sky', withPrefix('/assets/first-phaser3-game/sky.png'))
      this.load.image(
        'platform',
        withPrefix('/assets/first-phaser3-game/platform.png')
      )
      this.load.spritesheet(
        'dude',
        withPrefix('/assets/first-phaser3-game/dude.png'),
        { frameWidth: 32, frameHeight: 48 }
      )
    }

    let platforms
    let player
    let cursors

    function create() {
      this.add.image(400, 300, 'sky')

      platforms = this.physics.add.staticGroup()
      platforms
        .create(400, 568, 'platform')
        .setScale(2)
        .refreshBody()
      platforms.create(600, 400, 'platform')
      platforms.create(50, 250, 'platform')
      platforms.create(750, 220, 'platform')

      player = this.physics.add.sprite(100, 450, 'dude')
      player.setBounce(0.2)
      player.setCollideWorldBounds(true)

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      })
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20,
      })
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      })

      cursors = this.input.keyboard.createCursorKeys()

      this.physics.add.collider(player, platforms)
    }

    function update() {
      if (cursors.left.isDown) {
        player.setVelocityX(-160)
        player.anims.play('left', true)
      } else if (cursors.right.isDown) {
        player.setVelocityX(160)
        player.anims.play('right', true)
      } else {
        player.setVelocityX(0)
        player.anims.play('turn')
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330)
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Title>First Phaser3 Game</Title>

        <div id="game-root" />
      </Wrapper>
    )
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

export default PageWrapper(FirstPhaser3GamePage)

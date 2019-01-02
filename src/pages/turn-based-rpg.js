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

      preload() {}

      create() {}
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

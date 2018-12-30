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
      scene: {
        preload,
        create,
        update,
      },
    }

    const game = new Phaser.Game(config)

    function preload() {
      this.load.image('sky', withPrefix('/assets/first-phaser3-game/sky.png'))
    }

    function create() {
      this.add.image(400, 300, 'sky')
    }

    function update() {}
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

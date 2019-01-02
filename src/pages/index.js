import React from 'react'
import { Link } from 'gatsby'
import PageWrapper from '../components/PageWrapper'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Phaser3-ex</h1>
        <Link to="/first-phaser3-game">First Phaser3 Game</Link>
        <br />
        <Link to="/turn-based-rpg">Turn-Baesed RPG</Link>
      </div>
    )
  }
}

export default PageWrapper(HomePage)

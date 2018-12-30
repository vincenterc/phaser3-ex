import React from 'react'
import { Link } from 'gatsby'
import PageWrapper from '../components/PageWrapper'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Phaser3-ex</h1>
        <Link to="/first-phaser3-game">First phaser3 game</Link>
      </div>
    )
  }
}

export default PageWrapper(HomePage)

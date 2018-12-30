import React from 'react'
import styled from 'styled-components'
import './Layout.css'

class Layout extends React.Component {
  render() {
    let { children } = this.props

    return <Wrapper>{children}</Wrapper>
  }
}

const Wrapper = styled.div``

export default Layout

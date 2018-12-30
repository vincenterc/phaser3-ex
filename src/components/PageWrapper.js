import React from 'react'
import Layout from './Layout'

const PageWrapper = Comp => {
  class Wrapper extends React.Component {
    render() {
      return (
        <Layout {...this.props}>
          <Comp {...this.props} />
        </Layout>
      )
    }
  }

  Wrapper.displayName = `Wrapper-of-${Comp.displayName || Comp.name}`

  return Wrapper
}

export default PageWrapper

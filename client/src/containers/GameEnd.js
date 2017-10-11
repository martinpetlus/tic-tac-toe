import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContentAligner from '../components/ContentAligner'

class GameEnd extends Component {
  render() {
    const { status } = this.props

    if (status) return (
      <ContentAligner>
        {status}
      </ContentAligner>
    )

    return this.props.children
  }
}

export default connect(
  state => state.ticTacToe
)(GameEnd)

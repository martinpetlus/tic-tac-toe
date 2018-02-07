import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Board from '../components/Board'
import ContentAligner from '../components/ContentAligner'
import { markPosition } from '../actions'

const TicTacToe = props => (
  <ContentAligner>
    <Board {...props} />
  </ContentAligner>
)

function mapStateToProps(state) {
  return { ...state.ticTacToe }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onPositionClick: markPosition,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe)

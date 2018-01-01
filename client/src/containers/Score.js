import React from 'react'
import { connect } from 'react-redux'

import Text from '../components/Text';

const Score = (props) => (
  <Text>{props.win}:{props.loss}</Text>
)

export default connect(state => state.ticTacToe.score)(Score)

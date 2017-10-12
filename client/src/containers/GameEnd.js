import React, { Component } from 'react'
import { connect } from 'react-redux'

import { newGame } from '../actions'
import ContentAligner from '../components/ContentAligner'
import Dialog from '../components/Dialog'
import InlineTextWrapper from '../components/InlineTextWrapper'
import Button from '../components/Button'

const InlineTextWrapperStyled = InlineTextWrapper.extend`
  text-align: center;
  margin: 50px 0;
  width: 200px;
`

const DialogStyled = Dialog.extend`
  align-items: center;
`

const ButtonStyled = Button.extend`
  width: 130px
`

class GameEnd extends Component {
  render() {
    const { status, newGame } = this.props

    if (status) return (
      <ContentAligner>
        <DialogStyled>
          <InlineTextWrapperStyled>
            {status}
          </InlineTextWrapperStyled>
          <ButtonStyled onClick={newGame}>New Game</ButtonStyled>
        </DialogStyled>
      </ContentAligner>
    )

    return this.props.children
  }
}

export default connect(
  state => state.ticTacToe,
  { newGame }
)(GameEnd)

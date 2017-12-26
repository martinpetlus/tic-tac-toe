import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import InlineTextWrapper from '../components/InlineTextWrapper'
import ContentAligner from '../components/ContentAligner'
import TabButton from '../components/TabButton'
import Input from '../components/Input'
import Button from '../components/Button'
import Dialog from '../components/Dialog'
import {
  changeGameType,
  joinSessionId,
  newSessionId,
  restoreSessionId
} from '../actions'
import { NEW, JOIN } from '../constants/GameTypes'

const Row = styled.div`
  display: flex;
`

const TabButtonStyled = TabButton.extend`
  margin: 10px;
  height: 30px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RowContent = styled.div`
  padding: 15px;
  flex-grow: 1;
`

const InputStyled = Input.extend`
  width: 100%;
  margin-bottom: 10px;
`

const ButtonStyled = Button.extend`
  width: 100%;
`

const InlineTextWrapperStyled = InlineTextWrapper.extend`
  text-align: center;
  border: none;
`

class Intro extends Component {
  state = {
    joinSessionId: ''
  }

  componentDidMount() {
    this.changeSessionType()
  }

  changeSessionType() {
    const { newSessionId, restoreSessionId, type, newId, id } = this.props

    if (id) restoreSessionId(id)
    else if (type === NEW) newSessionId(newId)
  }

  handleJoinSessionInputChange = (e) => {
    this.setState({ joinSessionId: e.target.value })
  }

  handleJoinSessionClick = () => {
    if (this.state.joinSessionId) {
      this.props.joinSessionId(this.state.joinSessionId)
    }
  }

  render() {
    const { id, type, changeGameType, disconnected } = this.props

    if (disconnected) {
      return (
        <ContentAligner>
          <Dialog>Opponent disconnected.</Dialog>
        </ContentAligner>
      )
    }

    if (id) {
      return this.props.children
    }

    return (
      <ContentAligner>
        <Dialog>
          <Row>
            <TabButtonStyled
              selected={type === NEW}
              onClick={() => changeGameType(NEW)}
            >
              New Game
            </TabButtonStyled>
            <TabButtonStyled
              selected={type === JOIN}
              onClick={() => changeGameType(JOIN)}
            >
              Join Game
            </TabButtonStyled>
          </Row>
          <Row>
            {type === NEW
              ? <RowContent>
                  <InlineTextWrapperStyled>
                    {this.props.newId}
                  </InlineTextWrapperStyled>
                  <InlineTextWrapperStyled>
                    Waiting for opponent...
                  </InlineTextWrapperStyled>
                </RowContent>
              : <RowContent>
                  <InputStyled
                    type="text"
                    value={this.state.joinSessionId}
                    onChange={this.handleJoinSessionInputChange}
                    placeholder="Enter session identifier"
                  />
                  <ButtonStyled onClick={this.handleJoinSessionClick}>
                    Join game
                  </ButtonStyled>
                </RowContent>
            }
          </Row>
        </Dialog>
      </ContentAligner>
    )
  }
}

export default connect(
  state => state.session,
  {
    changeGameType,
    joinSessionId,
    newSessionId,
    restoreSessionId,
  }
)(Intro)

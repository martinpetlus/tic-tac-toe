import React, { Component } from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'

import TicTacToe from './containers/TicTacToe'
import Intro from './containers/Intro'
import GameEnd from './containers/GameEnd'
import Header from './components/Header'
import Button from './components/Button'
import Text from './components/Text'
import EditableName from './components/EditableName'
import { restartGame, changeName, leaveGame, sendMyName } from './actions'
import Score from './containers/Score';

injectGlobal`
  html, body {
    height: 100%;
    margin: 0;
  }

  #root {
    height: 100%;
  }

  *:focus {
    outline: none;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`

const Wrapper = styled.div`
  height: 100%;
`

const theme = {
  primaryColor: 'palevioletred',
  secondaryColor: 'lemonchiffon',
  hoverColor: 'white',
  textColor: 'mediumvioletred',
  fontSize: '1em'
}

class App extends Component {
  componentDidUpdate(prevProps) {
    const { session: { id, disconnected }, sendMyName } = this.props
    if (
      (!prevProps.session.id && id) ||
      (prevProps.session.disconnected && !disconnected)
    ) {
      sendMyName()
    }
  }

  render() {
    const {
      restartGame,
      changeName,
      leaveGame,
      names: { myName, opponentName },
      session
    } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header>
            {session.ready && <Button onClick={restartGame}>Restart</Button>}
            {session.ready &&
              <div>
                <EditableName
                  name={myName}
                  onNameChange={changeName}
                />
                {' '}
                <Score />
                {' '}
                <Text>{opponentName}</Text>
              </div>
            }
            {session.ready && <Button onClick={leaveGame}>Leave</Button>}
          </Header>
          <Intro>
            <GameEnd>
              <TicTacToe />
            </GameEnd>
          </Intro>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

export default connect(
  state => state,
  { changeName, restartGame, leaveGame, sendMyName }
)(App)

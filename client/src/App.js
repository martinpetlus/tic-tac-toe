import React, { Component } from 'react'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'

import TicTacToe from './containers/TicTacToe'
import Intro from './containers/Intro'
import GameEnd from './containers/GameEnd'
import Header from './components/Header'
import Button from './components/Button'
import EditableName from './components/EditableName'
import { restartGame, changeName, leaveGame } from './actions'
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
  render() {
    const { restartGame, changeName, leaveGame, name, session } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header>
            {session.ready &&
              <div>
                <Button onClick={restartGame}>Restart</Button>
                <Button onClick={leaveGame}>Leave</Button>
              </div>
            }
            {session.ready && <Score />}
            {session.ready &&
              <EditableName
                name={name}
                onNameChange={changeName}
              />
            }
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
  { changeName, restartGame, leaveGame }
)(App)

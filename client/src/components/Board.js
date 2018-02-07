import React from 'react'
import styled from 'styled-components'

import Position from './Position'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`

const Row = styled.div`
  display: flex;
`

export default function Board({ board, myMark, myTurn, onPositionClick }) {
  return (
    <Wrapper>
      {board.map((row, i) => (
        <Row key={i}>
          {row.map((position, j) => (
            <Position
              key={j}
              {...position}
              greyed={position.mark && position.mark !== myMark}
              onClick={
                (myTurn && !position.mark)
                  ? (() => onPositionClick({ row: i, col: j, mark: myMark }))
                  : undefined
              }
            />
          ))}
        </Row>
      ))}
    </Wrapper>
  )
}

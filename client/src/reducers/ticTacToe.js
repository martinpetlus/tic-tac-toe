import cloneDeep from 'lodash.clonedeep'

import { X, O } from '../constants/Marks'
import createEmptyBoard from '../utils/createEmptyBoard'
import checkGameStatus from '../utils/checkGameStatus'
import {
  MARK_POSITION,
  RESTART_GAME,
  JOIN_SESSION_SUCCESS,
  OPPONENT_JOINED
} from '../constants/ActionTypes'

const SIZE = 3

const initialState = {
  myMark: X,
  opponentMark: O,
  myTurn: false,
  board: createEmptyBoard(SIZE),
  status: undefined
}

export default function ticTacToeReducer(state = initialState, action) {
  const payload = action.payload

  switch (action.type) {
    case OPPONENT_JOINED:
      return {
        ...state,
        myTurn: true
      }
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        myMark: O,
        opponentMark: X
      }
    case MARK_POSITION: {
      const { row, col, mark } = payload
      const clonedBoard = cloneDeep(state.board)

      clonedBoard[row][col].mark = mark

      return {
        ...state,
        myTurn: mark !== state.myMark,
        board: clonedBoard,
        status: checkGameStatus(clonedBoard, state.myMark, state.opponentMark)
      }
    }
    case RESTART_GAME:
      return {
        ...state,
        board: createEmptyBoard(SIZE)
      }
    default:
      return state
  }
}

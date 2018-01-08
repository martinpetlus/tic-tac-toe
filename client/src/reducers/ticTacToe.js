import cloneDeep from 'lodash.clonedeep'

import { X, O } from '../constants/Marks'
import createEmptyBoard from '../utils/createEmptyBoard'
import checkGameStatus from '../utils/checkGameStatus'
import {
  MARK_POSITION,
  RESTART_GAME,
  NEW_GAME,
  JOIN_SESSION_SUCCESS,
  OPPONENT_JOINED,
  RESTORE_SESSION_SUCCESS
} from '../constants/ActionTypes'
import scoreReducer from './score'

const SIZE = 3

const initialState = {
  myMark: X,
  opponentMark: O,
  myTurn: false,
  board: createEmptyBoard(SIZE),
  status: undefined,
  score: scoreReducer(undefined, {}, undefined)
}

export default function ticTacToeReducer(state = initialState, action) {
  const payload = action.payload

  switch (action.type) {
    case OPPONENT_JOINED:
      return {
        ...state,
        myTurn: true
      }
    case RESTORE_SESSION_SUCCESS: {
      if (!action.initiator) {
        return {
          ...state,
          myMark: O,
          opponentMark: X
        }
      }

      return state;
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
      const status = checkGameStatus(clonedBoard, state.myMark, state.opponentMark)

      return {
        ...state,
        myTurn: mark !== state.myMark,
        board: clonedBoard,
        status,
        score: scoreReducer(state.score, action, status)
      }
    }
    case NEW_GAME:
    case RESTART_GAME:
      return {
        ...state,
        status: undefined,
        myTurn: state.myMark === X,
        board: createEmptyBoard(SIZE)
      }
    default:
      return state
  }
}

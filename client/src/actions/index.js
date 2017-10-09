import {
  MARK_POSITION,
  RESTART_GAME,
  CHANGE_NAME,
  CHANGE_GAME_TYPE,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_FAILURE
} from '../constants/ActionTypes'
import { NEW, JOIN } from '../constants/GameTypes'

export function markPosition(args) {
  return (dispatch, getState, { socket }) => {
    socket.emit(MARK_POSITION, getState().session.id, args)

    dispatch({
      type: MARK_POSITION,
      payload: { ...args }
    })
  }
}

export function restartGame() {
  return {
    type: RESTART_GAME,
  }
}

export function changeName(newName) {
  return {
    type: CHANGE_NAME,
    payload: newName
  }
}

export function changeGameType(newType) {
  return {
    type: CHANGE_GAME_TYPE,
    payload: newType
  }
}

export function joinSessionId(id) {
  return (dispatch, getState, { socket }) => {
    socket.emit(JOIN, id, ({ error }) => {
      if (error) {
        return dispatch({
          type: JOIN_SESSION_FAILURE,
          error: error.message || 'Something went wrong.'
        })
      }

      dispatch({
        type: JOIN_SESSION_SUCCESS,
        payload: id
      })
    })
  }
}

export function newSessionId(id) {
  return (dispatch, getState, { socket }) => {
    socket.emit(NEW, id)
  }
}

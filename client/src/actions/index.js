import {
  MARK_POSITION,
  RESTART_GAME,
  NEW_GAME,
  CHANGE_MY_NAME,
  CHANGE_GAME_TYPE,
  JOIN_SESSION_SUCCESS,
  JOIN_SESSION_FAILURE,
  RESTORE_SESSION,
  RESTORE_SESSION_FAILURE,
  RESTORE_SESSION_SUCCESS,
  LEAVE_GAME,
  CHANGE_OPPONENT_NAME
} from '../constants/ActionTypes'
import { NEW, JOIN } from '../constants/GameTypes'

export function markPosition(args) {
  return (dispatch, getState, { socket }) => {
    const action = { type: MARK_POSITION, payload: { ...args } }
    socket.emit(MARK_POSITION, action)
    dispatch(action)
  }
}

export function newGame() {
  return (dispatch, getState, { socket }) => {
    const action = { type: NEW_GAME }
    socket.emit(NEW_GAME, action)
    dispatch(action)
  }
}

export function restartGame() {
  return (dispatch, getState, { socket }) => {
    const action = { type: RESTART_GAME }
    socket.emit(RESTART_GAME, action)
    dispatch(action)
  }
}

export function leaveGame() {
  return (dispatch, getState, { socket }) => {
    const action = { type: LEAVE_GAME }
    socket.emit(LEAVE_GAME, action)
    dispatch(action)
  }
}

const emitMyName = (socket, name) => {
  socket.emit(CHANGE_OPPONENT_NAME, {
    type: CHANGE_OPPONENT_NAME,
    payload: name
  })
}

export function changeName(newName) {
  return (dispatch, getState, { socket }) => {
    emitMyName(socket, newName)

    dispatch({
      type: CHANGE_MY_NAME,
      payload: newName
    })
  }
}

export function changeGameType(newType) {
  return {
    type: CHANGE_GAME_TYPE,
    payload: newType
  }
}

export function restoreSessionId(id) {
  return (dispatch, getState, { socket }) => {
    socket.emit(RESTORE_SESSION, id, ({ error, actions, initiator }) => {
      if (error) {
        return dispatch({
          type: RESTORE_SESSION_FAILURE,
          error: error.message || 'Something went wrong.'
        })
      }

      dispatch({
        type: RESTORE_SESSION_SUCCESS,
        payload: id,
        initiator
      })

      actions.forEach(action => dispatch(action));
    });
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

      emitMyName(socket, getState().names.myName)
    })
  }
}

export function newSessionId(id) {
  return (dispatch, getState, { socket }) => {
    socket.emit(NEW, id)
  }
}

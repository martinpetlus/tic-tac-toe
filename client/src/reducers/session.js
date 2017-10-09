import {
  CHANGE_GAME_TYPE,
  JOIN_SESSION_SUCCESS,
  OPPONENT_JOINED
} from '../constants/ActionTypes'
import { NEW } from '../constants/GameTypes'
import uid from 'uid'

const SESSION_ID_KEY = 'session_id'

const initialState = {
  id: localStorage.getItem(SESSION_ID_KEY),
  ready: false,
  type: NEW,
  newId: uid()
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case OPPONENT_JOINED:
    case JOIN_SESSION_SUCCESS:
      return {
        ...state,
        id: action.payload,
        ready: true,
      }
    case CHANGE_GAME_TYPE:
      return {
        ...state,
        type: action.payload
      }
    default:
      return state
  }
}

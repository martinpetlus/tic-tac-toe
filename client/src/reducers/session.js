import {
  CHANGE_GAME_TYPE,
  JOIN_SESSION_SUCCESS,
  OPPONENT_JOINED,
  OPPONENT_RECONNECTED,
  OPPONENT_DISCONNECTED,
  RESTORE_SESSION_SUCCESS,
  RESTORE_SESSION_FAILURE
} from '../constants/ActionTypes'
import { NEW } from '../constants/GameTypes'
import uid from 'uid'

const SESSION_ID_KEY = 'session_id'

const initialState = {
  id: localStorage.getItem(SESSION_ID_KEY),
  ready: false,
  type: NEW,
  newId: uid(),
  disconnected: false,
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case OPPONENT_JOINED:
    case OPPONENT_RECONNECTED:
    case RESTORE_SESSION_SUCCESS:
    case JOIN_SESSION_SUCCESS: {
      const id = action.payload

      localStorage.setItem(SESSION_ID_KEY, id);

      return {
        ...state,
        id,
        ready: true,
        disconnected: false,
      }
    }
    case RESTORE_SESSION_FAILURE:
      return {
        ...initialState,
        id: null
      };
    case CHANGE_GAME_TYPE: {
      localStorage.removeItem(SESSION_ID_KEY);

      return {
        ...initialState,
        id: null,
        type: action.payload
      }
    }
    case OPPONENT_DISCONNECTED:
      return {
        ...state,
        disconnected: true,
        ready: false,
      }
    default:
      return state
  }
}

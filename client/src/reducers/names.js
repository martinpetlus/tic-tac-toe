import {
  CHANGE_MY_NAME,
  JOIN_SESSION_SUCCESS,
  RESTORE_SESSION_SUCCESS,
  CHANGE_OPPONENT_NAME,
} from '../constants/ActionTypes'

const NAME_KEY = 'name_key'

const DEFAULT_PLAYER_1 = 'Player 1'
const DEFAULT_PLAYER_2 = 'Player 2'

const getMyLocalName = defaultName =>
  localStorage.getItem(NAME_KEY) || defaultName

const initialState = {
  myName: getMyLocalName(DEFAULT_PLAYER_1),
  opponentName: DEFAULT_PLAYER_2,
  receivedOpponentName: null,
}

export default function namesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_OPPONENT_NAME:
      return {
        ...state,
        opponentName: action.payload,
        receivedOpponentName: action.payload,
      }
    case CHANGE_MY_NAME: {
      const newMyName = action.payload
      localStorage.setItem(NAME_KEY, newMyName)
      return {
        ...state,
        myName: newMyName,
      }
    }
    case RESTORE_SESSION_SUCCESS:
    case JOIN_SESSION_SUCCESS: {
      const { type, initiator } = action

      if (type === RESTORE_SESSION_SUCCESS && initiator) {
        return state
      }

      return {
        ...state,
        myName: getMyLocalName(DEFAULT_PLAYER_2),
        opponentName: state.receivedOpponentName || DEFAULT_PLAYER_1,
      }
    }
    default:
      return state
  }
}

export const getMyName = state => state.myName

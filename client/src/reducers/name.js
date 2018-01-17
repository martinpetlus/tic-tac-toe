import {
  CHANGE_NAME,
  JOIN_SESSION_SUCCESS,
  RESTORE_SESSION_SUCCESS
} from '../constants/ActionTypes'

const NAME_KEY = 'name_key'

const DEFAULT_PLAYER_1 = 'Player 1'
const DEFAULT_PLAYER_2 = 'Player 2'

const getMyName = defaultName => localStorage.getItem(NAME_KEY) || defaultName

const initialState = getMyName(DEFAULT_PLAYER_1)

export default function nameReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME: {
      const newName = action.payload
      localStorage.setItem(NAME_KEY, newName)
      return newName
    }
    case RESTORE_SESSION_SUCCESS: {
      if (!action.initiator) return getMyName(DEFAULT_PLAYER_2);
      return state;
    }
    case JOIN_SESSION_SUCCESS:
      return getMyName(DEFAULT_PLAYER_2);
    default:
      return state
  }
}

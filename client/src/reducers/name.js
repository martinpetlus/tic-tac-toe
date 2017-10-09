import { CHANGE_NAME, JOIN_SESSION_SUCCESS } from '../constants/ActionTypes'

const DEFAULT_PLAYER_1 = 'Player 1'
const DEFAULT_PLAYER_2 = 'Player 2'

const initialState = DEFAULT_PLAYER_1

export default function nameReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return action.payload
    case JOIN_SESSION_SUCCESS:
      return DEFAULT_PLAYER_2
    default:
      return state
  }
}

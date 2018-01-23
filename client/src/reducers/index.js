import { combineReducers } from 'redux'

import session from './session'
import ticTacToe from './ticTacToe'
import names, * as fromNames from './names'

const rootReducer = combineReducers({
  session,
  ticTacToe,
  names
})

export default rootReducer;

export const getMyName = state => fromNames.getMyName(state.names)

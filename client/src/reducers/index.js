import { combineReducers } from 'redux'

import session from './session'
import ticTacToe from './ticTacToe'
import names from './names'

const rootReducer = combineReducers({
  session,
  ticTacToe,
  names
})

export default rootReducer;

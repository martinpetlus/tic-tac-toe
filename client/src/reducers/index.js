import { combineReducers } from 'redux'

import session from './session'
import ticTacToe from './ticTacToe'
import name from './name'

const rootReducer = combineReducers({
  session,
  ticTacToe,
  name
})

export default rootReducer;

import checkBoardForWin from './checkBoardForWin'
import isBoardCompleted from './isBoardCompleted'
import { WIN, LOSS, DRAW } from '../constants/GameStatus'

export default function checkGameStatus(board, myMark, opponentMark) {
  if (checkBoardForWin(board, myMark)) return WIN
  else if (checkBoardForWin(board, opponentMark)) return LOSS
  else if (isBoardCompleted(board)) return DRAW
  else return undefined
}

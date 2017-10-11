export default function isBoardCompleted(board) {
  return board.every(rowPositions => rowPositions.every(position => position.mark))
}

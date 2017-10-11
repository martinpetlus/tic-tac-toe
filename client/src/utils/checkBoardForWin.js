function getRows(board) {
  return board
}

function getColumns(board) {
  return board.map((_, col) =>
    board.map((_, row) => board[row][col])
  )
}

function getDiagonals(board) {
  const size = board.length
  const result = [[], []]
  const [left, right] = result

  for (let i = 0; i < size; i += 1) {
    left.push(board[i][i])
  }

  for (let col = size - 1, row = 0; col >= 0 && row < size; col -= 1, row += 1) {
    right.push(board[row][col])
  }

  return result
}

function checkPositionsForWin(positions) {
  return positions.every(
    position => position.mark && position.mark === positions[0].mark
  )
}

export default function checkBoardForWin(board) {
  const winInRow = getRows(board).some(checkPositionsForWin)
  const winInColumn = !winInRow && getColumns(board).some(checkPositionsForWin)
  const winInDiagonal = (
    !winInRow &&
    !winInColumn &&
    getDiagonals(board).some(checkPositionsForWin)
  )

  return winInRow || winInColumn || winInDiagonal
}

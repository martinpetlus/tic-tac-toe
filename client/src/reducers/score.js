import { WIN, LOSS, DRAW } from '../constants/GameStatus'

const initialState = {
  win: 0,
  loss: 0,
  draw: 0
}

export default function scoreReducer(state = initialState, action, status) {
  const { win, loss, draw } = state;
  return {
    win: status === WIN ? win + 1 : win,
    loss: status === LOSS ? loss + 1 : loss,
    draw: status === DRAW ? draw + 1 : draw
  };
}

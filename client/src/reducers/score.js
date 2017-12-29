import { VICTORY, LOSS, DRAW } from '../constants/GameStatus'

const initialState = {
  victories: 0,
  losses: 0,
  draws: 0
}

export default function scoreReducer(state = initialState, action, status) {
  const { victories, losses, draws } = state;
  return {
    victories: status === VICTORY ? victories + 1 : victories,
    losses: status === LOSS ? losses + 1 : losses,
    draws: status === DRAW ? draws + 1 : draws
  };
}

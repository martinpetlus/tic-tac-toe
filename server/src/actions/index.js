import {
  OPPONENT_DISCONNECTED,
  OPPONENT_RECONNECTED,
  OPPONENT_JOINED,
} from 'client/constants/ActionTypes';

export const opponentDisconnected = () => ({
  type: OPPONENT_DISCONNECTED,
});

export const opponentReconnected = id => ({
  type: OPPONENT_RECONNECTED,
  payload: id,
});

export const opponentJoined = id => ({
  type: OPPONENT_JOINED,
  payload: id,
});

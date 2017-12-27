import {
  OPPONENT_DISCONNECTED,
  RESTORE_SESSION_SUCCESS,
  OPPONENT_JOINED,
} from 'client/constants/ActionTypes';

export const opponentDisconnected = () => ({
  type: OPPONENT_DISCONNECTED,
});

export const restoreSession = id => ({
  type: RESTORE_SESSION_SUCCESS,
  payload: id,
});

export const opponentJoined = id => ({
  type: OPPONENT_JOINED,
  payload: id,
});

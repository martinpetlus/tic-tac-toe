const {
  OPPONENT_JOINED,
  OPPONENT_DISCONNECTED,
} = require('client/constants/ActionTypes');
const { NEW, JOIN } = require('client/constants/GameTypes');
const Session = require('../models/session');

const sessionIdBySocket = new WeakMap();

module.exports = (socket) => {
  socket.on('disconnect', () => {
    const sessionId = sessionIdBySocket.get(socket);

    if (sessionId) {
      const opponent = Session.getOpponent(sessionId, socket);

      if (opponent) {
        opponent.emit('actions', { type: OPPONENT_DISCONNECTED });
      }

      Session.remove(sessionId, socket);
    }
  });

  socket.on(NEW, (id) => {
    sessionIdBySocket.set(socket, id);

    Session.new(id, socket);
  });

  socket.on(JOIN, (id, cb) => {
    sessionIdBySocket.set(socket, id);

    Session.join(id, socket, (error, { initiator } = {}) => {
      if (error) cb({ error });
      else {
        cb({});
        initiator.emit('actions', { type: OPPONENT_JOINED, payload: id });
      }
    });
  });
};

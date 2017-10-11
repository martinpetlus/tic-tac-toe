const {
  OPPONENT_JOINED,
  OPPONENT_DISCONNECTED,
} = require('client/constants/ActionTypes');
const { NEW, JOIN } = require('client/constants/GameTypes');
const Session = require('../models/session');

module.exports = (socket) => {
  socket.on('disconnect', () => {
    Session.remove(socket, (error, { opponent }) => {
      if (opponent) {
        opponent.emit('action', { type: OPPONENT_DISCONNECTED });
      }
    });
  });

  socket.on(NEW, (id) => {
    Session.new(id, socket);
  });

  socket.on(JOIN, (id, cb) => {
    Session.join(id, socket, (error, { initiator } = {}) => {
      if (error) cb({ error });
      else {
        cb({});
        initiator.emit('action', { type: OPPONENT_JOINED, payload: id });
      }
    });
  });
};

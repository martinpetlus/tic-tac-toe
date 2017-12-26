const {
  OPPONENT_JOINED,
  OPPONENT_DISCONNECTED,
  RESTORE_SESSION,
  RESTORE_SESSION_SUCCESS,
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

  socket.on(RESTORE_SESSION, (id, cb) => {
    Session.restore(id, socket, (error, { opponent } = {}) => {
      if (error) cb({ error });
      else {
        cb({});
        opponent.emit('action', { type: RESTORE_SESSION_SUCCESS, payload: id });
      }
    });
  });

  socket.on(NEW, (id) => {
    Session.new(id, socket);
  });

  socket.on(JOIN, (id, cb) => {
    Session.join(id, socket, (error, { opponent } = {}) => {
      if (error) cb({ error });
      else {
        cb({});
        opponent.emit('action', { type: OPPONENT_JOINED, payload: id });
      }
    });
  });
};

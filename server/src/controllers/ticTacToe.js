const { MARK_POSITION, RESTART_GAME, NEW_GAME } = require('client/constants/ActionTypes');
const Session = require('../models/session');

module.exports = (socket) => {
  socket.on(MARK_POSITION, (action) => {
    Session.markPosition(socket, action);
    Session.opponent(socket).emit('action', action);
  });

  socket.on(RESTART_GAME, (action) => {
    Session.opponent(socket).emit('action', action);
  });

  socket.on(NEW_GAME, (action) => {
    Session.opponent(socket).emit('action', action);
  });
};

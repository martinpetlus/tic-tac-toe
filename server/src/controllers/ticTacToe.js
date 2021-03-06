const {
  MARK_POSITION,
  RESTART_GAME,
  NEW_GAME,
  LEAVE_GAME,
} = require('client/constants/ActionTypes');
const Session = require('../models/session');

module.exports = (socket) => {
  socket.on(MARK_POSITION, (action) => {
    Session.saveAction(socket, action);
    Session.opponent(socket).emit('action', action);
  });

  socket.on(RESTART_GAME, (action) => {
    Session.clearActions(socket);
    Session.opponent(socket).emit('action', action);
  });

  socket.on(LEAVE_GAME, (action) => {
    Session.clearActions(socket);
    Session.leave(socket, (error, { opponent }) => {
      opponent.emit('action', action);
    });
  });

  socket.on(NEW_GAME, (action) => {
    Session.saveAction(socket, action);
    Session.opponent(socket).emit('action', action);
  });
};

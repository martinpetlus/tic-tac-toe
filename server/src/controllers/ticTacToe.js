const { MARK_POSITION } = require('client/constants/ActionTypes');
const Session = require('../models/session');

module.exports = (socket) => {
  socket.on(MARK_POSITION, (id, args) => {
    Session.opponent(id, socket).emit(
      'actions',
      { type: MARK_POSITION, payload: args },
    );
  });
};

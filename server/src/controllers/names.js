import { CHANGE_OPPONENT_NAME } from 'client/constants/ActionTypes';

const Session = require('../models/session');

module.exports = (socket) => {
  socket.on(CHANGE_OPPONENT_NAME, (action) => {
    const opponent = Session.opponent(socket);
    Session.saveAction(socket, action);
    if (opponent) opponent.emit('action', action);
  });
};

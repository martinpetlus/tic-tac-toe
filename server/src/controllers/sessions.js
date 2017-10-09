const { OPPONENT_JOINED } = require('client/constants/ActionTypes');
const { NEW, JOIN } = require('client/constants/GameTypes');
const Session = require('../models/session');

module.exports = (socket) => {
  socket.on(NEW, (id) => {
    Session.new(id, socket);
  });

  socket.on(JOIN, (id, cb) => {
    Session.join(id, socket, (error, { initiator }) => {
      if (error) cb({ error });
      else {
        cb({});
        initiator.emit('actions', { type: OPPONENT_JOINED, payload: id });
      }
    });
  });
};

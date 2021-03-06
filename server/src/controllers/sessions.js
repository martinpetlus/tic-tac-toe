import { RESTORE_SESSION } from 'client/constants/ActionTypes';
import { NEW, JOIN } from 'client/constants/GameTypes';
import {
  opponentDisconnected,
  opponentReconnected,
  opponentJoined,
} from '../actions';

const Session = require('../models/session');

module.exports = (socket) => {
  socket.on('disconnect', () => {
    Session.remove(socket, (error, { opponent }) => {
      if (opponent) {
        opponent.emit('action', opponentDisconnected());
      }
    });
  });

  socket.on(RESTORE_SESSION, (id, cb) => {
    Session.restore(id, socket, (error, { opponent } = {}) => {
      if (error) cb({ error });
      else {
        cb({
          initiator: Session.isInitiator(socket),
          actions: Session.getActions(socket),
        });
        opponent.emit('action', opponentReconnected(id));
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
        opponent.emit('action', opponentJoined(id));
      }
    });
  });
};

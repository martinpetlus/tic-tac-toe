const Session = require('../helpers/Session');

// Stores `Session` when somebody creates new game
const sessionById = new Map();

// Stores `Session` between two connected opponents
const sessionBySocket = new WeakMap();

module.exports.new = (id, socket) => {
  // eslint-disable-next-line no-param-reassign
  socket.newSessionId = id;

  sessionById.set(id, new Session(id, socket));
};

module.exports.join = (id, socket, cb) => {
  if (!sessionById.has(id)) {
    cb({ message: 'Session doesn\'t exists.' });
  } else if (sessionById.get(id).isOccupied()) {
    cb({ message: 'Joining to already occupied session.' });
  } else {
    const session = sessionById.get(id);
    const initiator = session.getInitiator();

    session.setJoiner(socket);
    sessionBySocket.set(socket, session);
    sessionBySocket.set(initiator, session);

    cb(null, { opponent: initiator });
  }
};

module.exports.remove = (socket, cb) => {
  let opponent;

  const handleRemove = (session) => {
    if (!session) return;

    opponent = session.getOpponent(socket);
    session.removeOpponent(socket);

    if (session.isEmpty()) {
      sessionById.delete(session.getId());
    }
  };

  handleRemove(sessionBySocket.get(socket));
  handleRemove(sessionById.get(socket.newSessionId));
  sessionBySocket.delete(socket);

  cb(null, { opponent });
};

module.exports.restore = (id, socket, cb) => {
  if (!sessionById.has(id)) {
    cb({ message: 'Session doesn\'t exists anymore.' });
  } else {
    const session = sessionById.get(id);
    session.restoreOpponent(socket);
    sessionBySocket.set(socket, session);
    cb(null, { opponent: session.getOpponent(socket) });
  }
};

module.exports.clearActions = socket =>
  sessionBySocket.get(socket).clearActions();

module.exports.markPosition = (socket, action) =>
  sessionBySocket.get(socket).markPosition(action);

module.exports.opponent = socket =>
  sessionBySocket.get(socket).getOpponent(socket);

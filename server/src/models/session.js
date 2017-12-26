const Session = require('../helpers/Session');

const currentSessions = new WeakMap();
const socketBySessionId = new Map();

module.exports.new = (id, socket) => {
  // eslint-disable-next-line no-param-reassign
  socket.sessionId = id;

  socketBySessionId.set(id, socket);
};

module.exports.join = (id, socket, cb) => {
  if (!socketBySessionId.has(id)) {
    cb({ message: 'Session doesn\'t exists.' });
  } else if (currentSessions.has(socketBySessionId.get(id))) {
    cb({ message: 'Joining to already occupied session.' });
  } else {
    const initiator = socketBySessionId.get(id);

    const session = new Session(initiator, socket);

    currentSessions.set(initiator, session);
    currentSessions.set(socket, session);

    cb(null, { initiator });
  }
};

module.exports.remove = (socket, cb) => {
  let opponent;

  if (currentSessions.has(socket)) {
    const session = currentSessions.get(socket);
    opponent = session.getOpponent(socket);

    currentSessions.delete(socket);
    currentSessions.delete(opponent);
  }

  socketBySessionId.delete(socket.sessionId);

  cb(null, { opponent });
};

module.exports.clearActions = socket =>
  currentSessions.get(socket).clearActions();

module.exports.markPosition = (socket, action) =>
  currentSessions.get(socket).markPosition(action);

module.exports.opponent = socket =>
  currentSessions.get(socket).getOpponent(socket);

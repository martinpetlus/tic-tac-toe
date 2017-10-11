const Session = require('../helpers/Session');

const existingSessions = new WeakMap();
const socketBySessionId = new Map();

module.exports.new = (id, socket) => {
  // eslint-disable-next-line no-param-reassign
  socket.sessionId = id;

  socketBySessionId.set(id, socket);
};

module.exports.join = (id, socket, cb) => {
  if (!socketBySessionId.has(id)) {
    cb({ message: 'Session doesn\'t exists.' });
  } else if (existingSessions.has(id)) {
    cb({ message: 'Joining to already occupied session.' });
  } else {
    const initiator = socketBySessionId.get(id);

    const session = new Session(initiator, socket);

    existingSessions.set(initiator, session);
    existingSessions.set(socket, session);

    cb(null, { initiator });
  }
};

module.exports.remove = (socket, cb) => {
  let opponent;

  if (existingSessions.has(socket)) {
    const session = existingSessions.get(socket);
    opponent = session.getOpponent(socket);

    existingSessions.delete(socket);
    existingSessions.delete(opponent);
  }

  socketBySessionId.delete(socket.sessionId);

  cb(null, { opponent });
};

module.exports.opponent = socket =>
  existingSessions.get(socket).getOpponent(socket);

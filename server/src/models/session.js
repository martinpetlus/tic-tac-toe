const Session = require('../helpers/Session');

const sessions = new Map();

module.exports.new = (id, socket) => {
  sessions.set(id, new Session(id, socket));
};

module.exports.join = (id, socket, cb) => {
  const session = sessions.get(id);

  if (!session) {
    cb({ message: 'Session doesn\'t exists.' });
  } else if (session.isOccupied()) {
    cb({ message: 'Joining to already occupied session.' });
  } else {
    session.join(socket);
    cb(null, { initiator: session.getInitiator() });
  }
};

module.exports.getOpponent = (id, socket) => {
  const session = sessions.get(id);
  const initiator = session.getInitiator();

  return socket.id === initiator.id ? session.getOpponent() : initiator;
};

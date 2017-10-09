module.exports = class Session {
  constructor(sessionId, initiator) {
    if (!initiator) throw new Error('Initiator must be provided.');

    this.sessionId = sessionId;
    this.initiator = initiator;
  }

  join(opponent) {
    this.opponent = opponent;
  }

  isOccupied() {
    return !!this.opponent;
  }

  getInitiator() {
    return this.initiator;
  }

  getOpponent() {
    return this.opponent;
  }
};

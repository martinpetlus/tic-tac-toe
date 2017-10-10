module.exports = class Session {
  constructor(initiator, opponent) {
    this.initiator = initiator;
    this.opponent = opponent;
  }

  getOpponent(socket) {
    if (this.initiator.id === socket.id) {
      return this.opponent;
    }

    return this.initiator;
  }
};

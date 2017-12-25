module.exports = class Session {
  constructor(initiator, opponent) {
    this.actions = {
      markPosition: [],
    };
    this.initiator = initiator;
    this.opponent = opponent;
  }

  getOpponent(socket) {
    if (this.initiator.id === socket.id) {
      return this.opponent;
    }

    return this.initiator;
  }

  clearActions() {
    Object.keys(this.actions).forEach((key) => {
      this.actions[key] = [];
    });
  }

  markPosition(action) {
    this.actions.markPosition.push(action);
  }
};

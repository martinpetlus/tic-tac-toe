module.exports = class Session {
  constructor(id, initiator) {
    this.id = id;
    this.initiator = initiator;
    this.actions = {
      markPosition: [],
    };
  }

  getActions() {
    return this.actions;
  }

  getId() {
    return this.id;
  }

  getOpponent(socket) {
    if (this.initiator && this.initiator.id === socket.id) {
      return this.joiner;
    }

    return this.initiator;
  }

  restoreOpponent(socket) {
    if (!this.initiator) this.initiator = socket;
    else if (!this.joiner) this.joiner = socket;
  }

  setJoiner(socket) {
    this.joiner = socket;
  }

  getInitiator() {
    return this.initiator;
  }

  isInitiator(socket) {
    return !!this.initiator && this.initiator.id === socket.id;
  }

  isOccupied() {
    return !!this.initiator && !!this.joiner;
  }

  clearActions() {
    Object.keys(this.actions).forEach((key) => {
      this.actions[key] = [];
    });
  }

  markPosition(action) {
    this.actions.markPosition.push(action);
  }

  isEmpty() {
    return !this.initiator && !this.joiner;
  }

  removeOpponent(socket) {
    if (this.initiator && this.initiator.id === socket.id) delete this.initiator;
    else if (this.joiner && this.joiner.id === socket.id) delete this.joiner;
  }
};

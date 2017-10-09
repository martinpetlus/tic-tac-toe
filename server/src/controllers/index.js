const controllers = [
  /* eslint-disable global-require */
  require('./sessions'),
  require('./ticTacToe'),
  /* eslint-enable global-require */
];

module.exports = (socket) => {
  controllers.forEach(controller => controller(socket));
};

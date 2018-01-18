const controllers = [
  /* eslint-disable global-require */
  require('./sessions'),
  require('./ticTacToe'),
  require('./names'),
  /* eslint-enable global-require */
];

module.exports = (socket) => {
  controllers.forEach(controller => controller(socket));
};

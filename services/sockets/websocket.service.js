var authService = require('../token.service')
var listeners = require('./listeners.service')

exports.onconnect = connection => {
  connection.use((socket, next) =>
    authService.chackSocketForToken(socket, next),
  )
  connection.sockets.on('connection', socket => {
    listeners.onnewconnect(connection, socket)

    socket.on('disconnect', () => {
      listeners.disconnect(connection, socket)
    })
  })
}

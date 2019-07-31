var User = require('../../models/user.model')

exports.onnewconnect = async (conn, socket) => {
  await User.updateOne(
    { name: socket.decodedJWT.name },
    { $set: { status: true } },
    { multi: true },
  )
  const sendData = {
    _id: socket.decodedJWT._id,
    name: socket.decodedJWT.name,
    status: true,
  }
  conn.emit('status change', JSON.stringify(sendData))
}

exports.disconnect = async (conn, socket) => {
  await User.updateOne(
    { name: socket.decodedJWT.name },
    { $set: { status: false } },
    { multi: true },
  )
  const sendData = {
    _id: socket.decodedJWT._id,
    name: socket.decodedJWT.name,
    status: false,
  }
  conn.emit('status change', JSON.stringify(sendData))
}

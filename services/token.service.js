var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var User = require('../models/user.model')
const SECRET = 'extraterrestrial3power2of1hyper-vomit!'

exports.chackSocketForToken = async function(socket, next) {
  try {
    if (
      socket.request._query.token === undefined ||
      socket.request._query.token === null
    ) {
      return
    }
    let decodedJWT = ''
    try {
      const token = socket.request._query.token
      decodedJWT = await jwt.verify(token, SECRET)
      const user = await User.find({ name: decodedJWT.name })
      if (user.length === 0) {
        return
      }
      await User.updateOne({ name: decodedJWT.name }, { status: true })
    } catch (err) {
      console.error(err)
    }
    socket.decodedJWT = decodedJWT
    next()
  } catch (err) {
    console.error(err)
  }
}

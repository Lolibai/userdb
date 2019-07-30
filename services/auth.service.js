var User = require('../models/user.model')
var jwt = require('jsonwebtoken')
const SECRET = 'extraterrestrial3power2of1hyper-vomit!'

const ERROR_CODES = {
  INVALID_PASSWORD_ERROR: 1,
  EXPIRED_TOKEN_ERROR: 2,
  EMPTY_FIELD_ERROR: 3,
  USER_DOESNT_EXIST: 4,
  INTERNAL_SERVER_ERROR: 5,
  NOT_ROOM_ADMIN: 6,
}

exports.protectRoute = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization
      let decodedJWT = ''
      try {
        decodedJWT = await jwt.verify(token, SECRET)
        if (decodedJWT === null) {
          return Promise.reject({
            errorCode: ERROR_CODES.EXPIRED_TOKEN_ERROR,
            message: 'Invalid token',
          })
        }
        const user = await User.find({ _id: decodedJWT._id })
        if (user.length === 0) {
          res.status(401)
          res.json({
            errorCode: ERROR_CODES.EXPIRED_TOKEN_ERROR,
            message: 'Invalid token',
          })
        }
      } catch (err) {
        res.status(400)
        res.json({
          errorCode: ERROR_CODES.EXPIRED_TOKEN_ERROR,
          message: 'jwt expired',
        })
        return
      }
      req.decodedJWT = decodedJWT
      next()
    } else {
      res.status(401)
      res.json({
        errorCode: ERROR_CODES.EMPTY_FIELD_ERROR,
        message: `Provide token`,
      })
    }
  } catch (err) {
    res.status(401).send(err)
  }
}

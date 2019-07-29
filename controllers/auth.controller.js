var jwt = require('jsonwebtoken')
var User = require('../models/user.model')
const bcrypt = require('bcrypt')

const TOKEN_EXPIRATION_TIME = 60 * 60;
const SECRET = 'extraterrestrial3power2of1hyper-vomit!'
const ERROR_CODES = {
  INVALID_PASSWORD_ERROR: 1,
  EXPIRED_TOKEN_ERROR: 2,
  EMPTY_FIELD_ERROR: 3,
  USER_DOESNT_EXIST: 4,
  INTERNAL_SERVER_ERROR: 5,
  NOT_ROOM_ADMIN: 6
}
const isValidPassword = (user, password) => {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}
exports.login = async (req, res) => {
  try {
    if (
      req.body.name === null ||
      req.body.name === undefined ||
      req.body.name.length === 0
    ) {
      res.status(400)
      res.json({
        errorCode: ERROR_CODES.EMPTY_FIELD_ERROR,
        message: "Provide user's name"
      })
    }
    if (
      req.body.password === null ||
      req.body.password === undefined ||
      req.body.password.length === 0
    ) {
      res.status(400)
      res.json({
        errorCode: ERROR_CODES.EMPTY_FIELD_ERROR,
        message: "Provide user's password"
      })
    }
    return User.findOne({ name: req.body.name })
      .then(async user => {
        if (user === null) {
          res.status(400)
          res.json({
            errorCode: ERROR_CODES.USER_DOESNT_EXIST,
            message: `User with name "${req.body.name}" doesn't exist`
          })
        }
        if ((await isValidPassword(user, req.body.password)) === false) {
          res.status(400)
          res.json({
            errorCode: ERROR_CODES.INVALID_PASSWORD_ERROR,
            message: 'Invalid password'
          })
        }
        const token = jwt.sign(user.toJSON(), SECRET, {
          expiresIn: TOKEN_EXPIRATION_TIME
        })
        let newUser = { ...user.toJSON() }
        delete newUser.password
        res.status(200)
        res.json({ token, user: newUser })
      })
      .catch(err => {
        res.status(500)
        res.json({
          errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR,
          message: err.message
        })
      })
  } catch (err) {
    logger.info(err)
  }
}

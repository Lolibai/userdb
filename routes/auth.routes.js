var express = require("express");
var authRouter = express.Router();
var authController = require("../controllers/auth.controller");

/**
 * @typedef AuthLogin
 * @property {string} name.required
 * @property {string} password.required
 */
/**
 * This function logins user to system
 * @route POST /login
 * @group Auth - Operations about login
 * @returns {object} 200 - Token and user
 * @returns {Error}  default - Unexpected error
 */
authRouter.post("/login", authController.login);

module.exports = authRouter;

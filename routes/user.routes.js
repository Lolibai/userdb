var express = require("express");
var userRouter = express.Router();
var userController = require("../controllers/user.controller");
userRouter.get("/", userController.default);
/**
 * @typedef User
 * @property {string} name.required
 */
/**
 * @typedef UserUpdate
 * @property {string} id.required
 * @property {string} name.required
 */
/**
 * This function gets all users users
 * @route GET /users
 * @group Users - Operations about user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
userRouter.get("/users", userController.getAllUsers);
/**
 * This function gets user
 * @route GET /user/{id}
 * @group Users - Operations about user
 * @param {string} id.path.required - User id
 * @returns {object} 200 - User info
 * @returns {Error}  default - Unexpected error
 */
userRouter.get("/user/:id", userController.getUserById);
/**
 * This function create user
 * @route POST /user
 * @group Users - Operations about user
 * @param {User.model} name.body.required - the new user name
 * @returns {object} 200 - User created
 * @returns {Error}  default - Unexpected error
 */
userRouter.post("/user", userController.createUser);
/**
 * This function updates a user
 * @route PUT /user
 * @group Users - Operations about user
 * @param {UserUpdate.model} user.body.required - the new user model
 * @returns {object} 200 - User updated
 * @returns {Error}  default - Unexpected error
 */
userRouter.put("/user", userController.updateUser);
/**
 * This function delete a user 
 * put just whole new user body to update
 * @route DELETE /user/{id}
 * @group Users - Operations about user
 * @param {string} id.path.required - ID of user to delete
 * @returns {object} 200 - User deleted
 * @returns {Error}  default - Unexpected error
 */
userRouter.delete("/user/:id", userController.removeUser);

/**
 * This function deletes all users
 * put just whole new user body to update
 * @route DELETE /users
 * @group Users - Operations about user
 * @returns {object} 200 - Users were deleted
 * @returns {Error}  default - Unexpected error
 */
userRouter.delete("/users", userController.removeAllUsers);

module.exports = userRouter;

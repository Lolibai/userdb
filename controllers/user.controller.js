var User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.default = (req, res) => {
  res.send('HELLO WORLD');
};

exports.getAllUsers = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) {
      res.json({ message: 'getAllUsers', error: err });
    } else {
      res.json(users);
    }
  });
};

exports.getUserById = (req, res) => {
  User.findOne({
    _id: req.params.id
  }).exec((err, user) => {
    if (err) {
      res.json({ message: 'getUserById', error: err });
    } else {
      res.json(user);
    }
  });
};

exports.createUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    var newUser = new User({...req.body, password});

    newUser.save((err, user) => {
      if (err) {
        res.status(409);
        res.json({ message: 'createUser', error: err });
      } else {
        let newUser = user.toJSON();
        delete newUser.password;
        res.json(newUser);
      }
    });
  } catch (err) {
    console.log('err: ', err);
  }
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.body.id
    },
    {
      $set: req.body
    },
    {
      new: true
    },
    (err, newUser) => {
      if (err) {
        res.json({ message: 'updateUser', error: err });
      } else {
        res.json(newUser);
      }
    }
  );
};

exports.removeUser = (req, res) => {
  User.findOneAndDelete(
    {
      _id: req.params.id
    },
    (err, user) => {
      if (err) {
        res.json({ message: 'removeUser', error: err });
      } else {
        res.json({ message: `The user with id ${req.params.id} was deleted!`, id: req.params.id});
      }
    }
  );
};

exports.removeAllUsers = (req, res) => {
  User.remove({}, (err, user) => {
    if (err) {
      res.json({ message: 'removeAllUsers', error: err });
    } else {
      res.json({ message: `Users were deleted!` });
    }
  });
};

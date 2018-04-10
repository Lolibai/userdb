var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  "User",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true
    }
  })
);

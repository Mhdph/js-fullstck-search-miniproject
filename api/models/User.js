const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  family: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  profile_image: { type: String, defaut: "" },
  work: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);

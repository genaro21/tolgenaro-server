const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    localidad: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      reqired: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.statics.encrypt = async function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.statics.compare = async function (password, hash) {
  return bcrypt.compare(password, hash);
};

module.exports = model("User", userSchema);

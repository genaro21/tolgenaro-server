const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signUp = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      email,
      direccion,
      localidad,
      password1,
      password2,
    } = req.body;
    if (
      !nombre ||
      !apellidos ||
      !email ||
      !direccion ||
      !localidad ||
      !password1 ||
      !password2
    ) {
      return res.json({ error: "Todos los campos deben ser completados" });
    }
    if (password1 !== password2) {
      return res.json({ error: "Los passwords no coinciden" });
    }

    const hash = await models.user.encrypt(password1);

    const user = {
      nombre,
      apellidos,
      email,
      direccion,
      localidad,
      password: hash,
    };
    console.log("user:", user);
    const existUser = await models.user.findOne({ email });
    if (existUser) {
      return res.json({ error: "El usuario ya existe" });
    }
    const data = await models.user.create(user);

    return res.status(201).json({ data });
  } catch (err) {
    return res.json(err);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await models.user.findOne({ email });
    if (!user) {
      return res.json({ error: "El usuario no existe" });
    }
    const isValid = await models.user.compare(password, user.password);
    if (!isValid) {
      return res.json({ error: "Usuario no encontrado" });
    }
    console.log(user.password, password);

    const token = jwt.sign({ user }, config.jwt.secret);

    return res.json({ token, user });
  } catch (err) {
    return res.json({ err });
  }
};
const logout = (req, res) => {
  localStorage.clear();
};

module.exports = {
  signUp,
  signIn,
  logout,
};

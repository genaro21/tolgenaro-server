const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

const createSale = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("body:", req.body);

    const payload = jwt.verify(token, config.jwt.secret);
    console.log(payload);
    console.log(req.body.products);
    const products = req.body.products;
    const user = await models.user.findById(payload.user._id);

    const sale = await models.sale.create({ user, products });

    return res.json({ sale });
  } catch (err) {
    return res.json("hola");
  }
};

const createSale2 = (req, res) => {
  res.json("CreateSale2");
};

module.exports = {
  createSale,
  createSale2,
};

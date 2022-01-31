const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    nombre: {
      type: String,
      required: true,
    },

    categoria: {
      type: String,
      required: true,
    },

    peso: {
      type: String,
      required: true,
    },

    precio: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);

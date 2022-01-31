const { Schema, model } = require("mongoose");

const saleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        cantidad: {
          type: Number,
          default: 1,
        },
        producto: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = model("Sale", saleSchema);

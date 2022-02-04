const models = require("../models");

const create = async (req, res) => {
  try {
    const {
      nombre,
      categoria,
      peso1,
      peso2,
      peso3,
      precio1,
      precio2,
      precio3,
    } = req.body;
    const image = req.file;
    const filePath = "http://localhost:4900/image/" + image.filename;

    const product = {
      image: filePath,
      nombre,
      categoria,
      peso1,
      peso2,
      peso3,
      precio1,
      precio2,
      precio3,
    };
    console.log({ product });

    if (
      !image ||
      !nombre ||
      !categoria ||
      !peso1 ||
      !peso2 ||
      !peso3 ||
      !precio1 ||
      !precio2 ||
      !precio3
    ) {
      return res.json({ error: "Debes rellenar todos los campos" });
    }

    const existProduct = await models.product.findOne({ nombre });
    if (existProduct) {
      return res.json({ error: "El producto ya existe" });
    }

    const product1 = {
      image: filePath,
      nombre,
      categoria,
      peso: peso1,
      precio: precio1,
    };
    console.log(product1);

    const product2 = {
      image: filePath,
      nombre,
      categoria,
      peso: peso2,
      precio: precio2,
    };
    console.log(product2);

    const product3 = {
      image: filePath,
      nombre,
      categoria,
      peso: peso3,
      precio: precio3,
    };
    console.log(product3);

    const data1 = await models.product.create(product1);

    const data2 = await models.product.create(product2);

    const data3 = await models.product.create(product3);

    return res.json({ data1, data2, data3 });
  } catch (err) {
    return res.json(err);
  }
};

const all = async (req, res) => {
  const products = await models.product.find();
  const data = {};
  const index = 0;
  console.log(products);
  for (const obj of products) {
    if (data[obj.nombre]) {
      data[obj.nombre]["peso" + data[obj.nombre].counter] = obj.peso;
      data[obj.nombre]["precio" + data[obj.nombre].counter] = obj.precio;
      data[obj.nombre]["id" + data[obj.nombre].counter] = obj._id;
      data[obj.nombre].counter++;
    }

    data[obj.nombre] = {
      ...(data[obj.nombre]
        ? data[obj.nombre]
        : {
            nombre: obj.nombre,
            categoria: obj.categoria,
            image: obj.image,
            peso0: obj.peso,
            precio0: obj.precio,
            id0: obj._id,
            counter: 1,
          }),
    };
  }
  return res.json(data);
};

const getName = async (req, res) => {
  const { nombre, categoria } = req.body;
  // const products = await models.product.find({ nombre });
  console.log(nombre);
  const regex = new RegExp(`${nombre}`, "i");
  const products = await models.product.find({
    nombre: { $regex: regex },
    categoria,
  });
  console.log("products: ", products);

  const data = {};
  const index = 0;
  console.log(products);
  for (const obj of products) {
    if (data[obj.nombre]) {
      data[obj.nombre]["peso" + data[obj.nombre].counter] = obj.peso;
      data[obj.nombre]["precio" + data[obj.nombre].counter] = obj.precio;
      data[obj.nombre]["id" + data[obj.nombre].counter] = obj._id;
      data[obj.nombre].counter++;
    }

    data[obj.nombre] = {
      ...(data[obj.nombre]
        ? data[obj.nombre]
        : {
            nombre: obj.nombre,
            categoria: obj.categoria,
            image: obj.image,
            peso0: obj.peso,
            precio0: obj.precio,
            id0: obj._id,
            counter: 1,
          }),
    };
  }
  return res.json(data);
};

const get = async (req, res) => {
  try {
    const productId = req.params;
    const product = await models.product.findById(productId);
    return res.json(product);
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    console.log("'" + categoria + "'");
    const products = await models.product.find({ categoria });

    const data = {};
    const index = 0;
    console.log(products);
    for (const obj of products) {
      if (data[obj.nombre]) {
        data[obj.nombre]["peso" + data[obj.nombre].counter] = obj.peso;
        data[obj.nombre]["precio" + data[obj.nombre].counter] = obj.precio;
        data[obj.nombre]["id" + data[obj.nombre].counter] = obj._id;
        data[obj.nombre].counter++;
      }

      data[obj.nombre] = {
        ...(data[obj.nombre]
          ? data[obj.nombre]
          : {
              nombre: obj.nombre,
              categoria: obj.categoria,
              image: obj.image,
              peso0: obj.peso,
              precio0: obj.precio,
              id0: obj._id,
              counter: 1,
            }),
      };
    }
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
};

const update = async (req, res) => {
  try {
    const productId = req.params;
    const product = await models.product.findById(productId);
    console.log(product);
    product.nombre = req.body.nombre;
    product.peso1 = req.body.peso1;
    product.peso2 = req.body.peso2;
    product.peso3 = req.body.peso3;
    product.precio1 = req.body.precio1;
    product.precio2 = req.body.precio2;
    product.precio3 = req.body.precio3;
    await product.save();

    return res.json({ product });
  } catch (err) {
    console.log(err);
  }
};

const remove = async (req, res) => {
  const productId = req.params;
  const product = await models.product.findByIdAndDelete(productId);
  return res.json(product);
};

module.exports = {
  create,
  all,
  get,
  getName,
  getCategory,
  update,
  remove,
};

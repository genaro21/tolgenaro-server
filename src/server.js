const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const server = express();
const routes = require("./routes");

const path = require("path");

//Settings.
server.set("port", 4900);

//Middlewares.
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

//Routes.
server.use("/api/user", routes.user);
server.use("/api/product", routes.product);
server.use("/api/sale", routes.sale);

//Public folder.
server.use(express.static(path.join(__dirname, "public")));

module.exports = server;

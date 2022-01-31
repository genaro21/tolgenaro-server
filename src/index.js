const server = require("./server");
require("./database");

server.listen(server.get("port"), () => {
  console.log("Server running on port: ", server.get("port"));
});

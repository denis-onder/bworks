const app = require("express")();
const config = require("../../config/config");
const database = require("../../config/database");
const routes = require(`./api/${config.API_VERSION}/board`);
const applyMiddleware = require("../../middleware/applyMiddleware");
const verifyUser = require("../../middleware/verifyUser");

// Apply middleware
applyMiddleware(app);
app.all("*", verifyUser);

// Database connection
database.connect(config.BOARD_DB_URI);

// Router init
app.use("/board", routes);

// Server init
app.listen(config.BOARD_SERVER_PORT, err => {
  if (err) process.exit(1);
  console.log(`Board service running on port: ${config.BOARD_SERVER_PORT}`);
});

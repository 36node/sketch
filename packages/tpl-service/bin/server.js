#!/usr/bin/env node

const mongoose = require("mongoose");
const { app, config, somejob } = require(process.env.NODE_ENV === "production"
  ? "../dist"
  : "../src");

const { PORT, MONGODB_CONNECTION } = config;

/**
 * connect to mongodb
 */
mongoose.Promise = Promise;
mongoose.connect(MONGODB_CONNECTION, {
  useNewUrlParser: true,
  auto_reconnect: true,
  reconnectInterval: 30 * 1000,
  reconnectTries: 1000,
  keepAlive: true,
  connectTimeoutMS: 30 * 1000,
});
mongoose.connection.on("open", async () => {
  await somejob();
});
mongoose.connection.on("error", () => {
  console.error("mongodb connection error");
});

/**
 * start app
 */
app.listen(PORT, () =>
  console.info(`[${process.env.NODE_ENV}] http server start on port ${PORT} 🚀`)
);

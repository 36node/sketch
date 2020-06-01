#!/usr/bin/env node

import mongoose from "mongoose";

import { app, config, logger } from "./index";

const { PORT, MONGODB_CONNECTION } = config;

logger.info(config, "config list");

/**
 * connect to mongodb
 */
mongoose.connect(MONGODB_CONNECTION, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  auto_reconnect: true,
  reconnectInterval: 30 * 1000,
  reconnectTries: 1000,
  keepAlive: true,
  connectTimeoutMS: 30 * 1000,
});

mongoose.connection.on("open", async () => {
  logger.info("mongodb connected");
});

mongoose.connection.on("error", () => {
  logger.error("mongodb connection error");
});

/**
 * start app
 */
app.listen(PORT, () =>
  logger.info(`[${process.env.NODE_ENV}] http server start on port ${PORT} 🚀`)
);

app.on("error", err => console.error(err));

const express = require("express");
const config = require("../common/config");
const accountsRouter = require("./accounts");
const typesRouter = require("./types");
const announcementsRouter = require("./announcements");


const router = express.Router();

const setRouter = app => {
  router.use(`/${config.apiVersion}/accounts`, accountsRouter);
  router.use(`/${config.apiVersion}/types`, typesRouter);
  router.use(`/${config.apiVersion}/announcements`, announcementsRouter);


  app.use(`/api`, router);

  app.get("/status", (req, res) => res.send("OK"));
  app.get("/version", (req, res) => res.json({ version: config.apiVersion }));
  app.get("/health", (req, res) => res.json({ mysql: "OK", redis: "OK" }));
};

module.exports = { setRouter };

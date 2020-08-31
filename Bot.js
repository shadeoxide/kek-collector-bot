const { Client, Collection } = require("discord.js");

class Bot extends Client {
  /**
   * @constructor
   * @param {Object} options Client Options
   */
  constructor(options) {
    super(options);
    this.db = require("quick.db");
  }
  
// error handlers
process.on("uncaughtException", err => {
  console.error("Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

module.exports = Bot;

const { Client, Collection } = require("discord.js");

class Oxide extends Client {
  /**
   * @constructor
   * @param {Object} options Client Options
   */
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.db = require("quick.db");
    this.queue = new Map();
    this.request = require("node-fetch");
  }

  /**
   * fetchCommand
   * @param {String} name command name
   */
  fetchCommand(name) {
    return this.commands.get(name) || this.commands.get(this.aliases.get(name));
  }

  /**
   * clean text
   * @param {String} text text
   */
  cleanText(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 1 });

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(
        this.token,
        process.env.TOKEN
      );

    return text;
  }

  /**
   * parseInt
   * @param {String} string string to parse number
   */
  parseInt(string) {
    const isNumber = string => isFinite(string) && +string === string;
    const isString = string => typeof string === "string";
    function parseNumberFromString(str) {
      const matches = str
        .replace(/,/g, "")
        .match(/(\+|-)?((\d+(\.\d+)?)|(\.\d+))/);
      return matches && matches[0] ? Number(matches[0]) : NaN;
    }
    if (isNumber(string)) {
      return Number(string);
    }
    if (isString(string)) {
      return parseNumberFromString(string);
    }
    return NaN;
  }

  /**
   * start the bot
   */
  run() {
    return this.login(process.env.TOKEN);
  }
  /**
   * kok
   */
  userCount() {
    return this.users.cache.size
  }
}

// error handlers
process.on("uncaughtException", err => {
  console.error("Uncaught Exception: ", err);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

module.exports = Oxide;

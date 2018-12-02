const { EventEmitter } = require("events");
const server = require("./server/server");
const repository = require("./repository/repository");
const config = require("./config");
const db = require("./db");
const mediator = new EventEmitter();

console.log(`--- Movies Service ---`);
console.log(`Connecting to movies repository`);

process.on("uncaughtException", err => {
  console.error(`Unhandled exception ${err}`);
});

process.on("uncaughtRejection", (err, promise) => {
  console.error(`Unhandled rejection ${err}`);
});

mediator.on("db.ready", db => {
  let rep = null;

  repository
    .connect(db)
    .then(repo => {
      console.log(`Repository connected, starting server`);
      rep = repo;
      return server.start({
        port: config.port,
        repo
      });
    })
    .then(app => {
      console.log(
        `Server started successfully, running on port ${config.port}`
      );
      app.on("close", () => {
        rep.disconnect();
      });
    });
});

mediator.on("db.error", err => {
  console.error(err);
});

db.connect(mediator);

mediator.emit("boot.ready");

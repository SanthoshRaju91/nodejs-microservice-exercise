const MongoClient = require("mongodb");
const config = require("./config");

const connect = mediator => {
  mediator.once("boot.ready", () => {
    MongoClient.connect(
      config.db,
      (err, client) => {
        if (err) {
          mediator.emit("db.error", err);
        }

        const db = client.db("movies");
        mediator.emit("db.ready", db);
      }
    );
  });
};

module.exports = Object.assign({}, { connect });

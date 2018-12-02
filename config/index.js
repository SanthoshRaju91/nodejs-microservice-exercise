const config = {
  db: process.env.DB || "mongodb://localhost:27017",
  port: process.env.PORT || 3000
};
module.exports = Object.assign({}, config);

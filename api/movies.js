const status = require("http-status");

module.exports = (app, options) => {
  const { repo } = options;

  // get all movies
  app.get("/movies", (req, res, next) => {
    repo
      .getAllMovies()
      .then(movies => {
        res.status(status.OK).json(movies);
      })
      .catch(next);
  });

  // get all premier movies
  app.get("/movies/premieres", (req, res, next) => {
    repo
      .getMoviePremiers()
      .then(movies => {
        res.status(status.OK).json(movies);
      })
      .catch(next);
  });

  // we get movie by id
  app.get("/movies/:id", (req, res, next) => {
    repo
      .getMovieById(req.params.id)
      .then(movie => {
        res.status(status.OK).json(movie);
      })
      .catch(next);
  });
};

"use strict";

// this would be a factory function, that holds an open connection to the database
// and expose functions for accessing the data.

const repository = db => {
  // create movies collection from db collection
  const collection = db.collection("movies");

  const getAllMovies = () => {
    return new Promise((resolve, reject) => {
      const movies = [];

      const cursor = collection.find();

      cursor.forEach(addMovie, sendMovies);

      function addMovie(movie) {
        movies.push(movie);
      }

      function sendMovies(err) {
        if (err) {
          reject(
            new Error(`An error occured while fetching all movies ${err}`)
          );
        }

        resolve(movies);
      }
    });
  };
  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = [];
      const currentDay = new Date();

      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      };

      const cursor = collection.find(query);

      cursor.forEach(addMovie, sendMovies);

      function addMovie(movie) {
        movies.push(movie);
      }

      function sendMovies(err) {
        if (err) {
          reject(
            new Error(`An error occured fetching all movies, err: ${err}`)
          );
        }

        resolve(movies);
      }
    });
  };

  const getMovieById = id => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 };

      const sendMovie = (err, movie) => {
        if (err) {
          reject(
            new Error(
              `An error occured fetching a movie with id ${id}, err: ${err}`
            )
          );
        }
        resolve(movie);
      };
      collection.findOne({ id: id }, projection, sendMovie);
    });
  };

  const disconnect = () => {
    db.close();
  };

  return Object.create({
    getAllMovies,
    getMoviePremiers,
    getMovieById,
    disconnect
  });
};

const connect = connection => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error(`connection db not supplied`));
    }

    resolve(repository(connection));
  });
};

module.exports = Object.assign({}, { connect });

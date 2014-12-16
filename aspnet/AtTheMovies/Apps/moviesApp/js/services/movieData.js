﻿(function(module) {

    var movieData = function($http, $q, $log) {

        var movies = [];
        $log.info("Creating movies service");


        var saveMovie = function(movie) {
            return $http.put("/api/movies", movie);
        };

        var getMovieById = function (id) {
            var url = "/api/movies/" + id;
            return $http.get(url)
                        .then(function(response) {
                            return response.data;
                        });
        };

        var getAllMovies = function () {
            if (movies.length > 0) {
                $log.info("Got movies from cache")
                return $q.when(movies);
            } else {
                return $http.get("/api/movies")
                    .then(function (response) {
                        $log.info("Got movies from API");
                        movies = response.data;
                        return movies;
                    });
            }
        };


        return {
            getAllMovies: getAllMovies,
            saveMovie: saveMovie,
            getMovieById: getMovieById
        };
    };

    module.factory("movieData", movieData);

}(angular.module("moviesApp")));
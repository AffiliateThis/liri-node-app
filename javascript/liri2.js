require('dotenv').config();
var fs = require('fs');

// required variables
// var random = require("../random.txt");
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");

// required api's and integrators
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// var bandsInTown = require(keys.bandsInTown);
// var omdbapi = require(keys.omdbapi);

// Arguments

var searchPrompt = process.argv[2];
var bandSearch = process.argv.slice(3).join("");
var songSearch = process.argv.slice(3).join("+");
var movieSearch = process.argv.slice(3).join("+");
var userInput = process.argv[3];



// Bands in Town

if (searchPrompt === "concert-this") {
    axios
        .get("https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=fdf29228-8c7b-4bd2-ad03-d7d1552b48cd")
        .then(function (response) {
            var bandInfo = [

                ""
                , "Venue:" + response.data[0].venue.name
                , "City:" + response.data[0].venue.city
                , "Time:" + moment(response.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:ss a")
            ].join("\n\n");
            console.log(bandInfo)
            // "Time:" + response.data.dataTime,



            // });

            fs.appendFile("log.txt", bandInfo, function (err, data) {
                if (err) throw err;
                console.log(data)


            });

        });

}





// Omdb

if (searchPrompt === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=998f6429")
        .then(
            function (response) {
                var movieArr = [
                    "",
                    , "Title: " + response.data.Title
                    , "Release Date: " + response.data.Released
                    , "IMDB Rating: " + response.data.imdbRating
                    , "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value
                    , "Country: " + response.data.imdbRating
                    , "Language: " + response.data.Country
                    , "Plot: " + response.data.Plot
                    , "Actors: " + response.data.Actors].join("\n\n");

                console.log(movieArr)
                fs.appendFile("log.txt", movieArr, function (err, data) {
                    if (err) throw err;
                    console.log(data)
                });

            });


}


// Spotify 

if (searchPrompt === "spotify-this-song") {
    spotify
        .search({ type: 'track', query: songSearch })
        .then(
            function (response) {
                var artistName = response.tracks.items[0].album.artists[0].name;
                var songName = response.tracks.items[0].name;
                var albumName = response.tracks.items[0].album.name;
                var previewThis = response.tracks.items[0].preview_url;
                console.log(`
                Artist:  ${artistName} 
                Song: ${songName}
                Album: ${albumName}
                Preview mp3:  ${previewThis}`);
                fs.appendFile("log.txt", response, function (err, data) {
                    if (err) throw err;
                    console.log(data)
                });


                // var bandName = songResponse.tracks.items[0].album.artist[0].name;
                // var songName = songResponse.tracks.items[0].name;
                // var albumName = songResponse.tracks.items[0].album.name;
                // var previewLink = songResponse.tracks.items[0].preview_url;

                // console.log("----------------------------");
                // console.log(`Artist: ${bandName}`)
            });

}




if (searchPrompt === "do-what-it-says") {
    fs.readFile("../random.txt", "utf-8", (err, data) => {
        if (err) throw err;

        var randomQuery = data.split('"');
        var arr1 = randomQuery[1];

        spotify
            .search({ type: 'track', query: randomQuery[1] })
            .then(
                function (response) {
                    var artistName = response.tracks.items[0].album.artists[0].name;
                    var songName = response.tracks.items[0].name;
                    var albumName = response.tracks.items[0].album.name;
                    var previewThis = response.tracks.items[0].preview_url;
                    console.log(`
                    Artist:  ${artistName} 
                    Song: ${songName}
                    Album: ${albumName}
                    Preview mp3:  ${previewThis}`);


                });






    });




}



require('dotenv').config();

// required variables
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
// var spotify = new Spotify(keys.spotify);
var omdbapi = require(keys.omdbapi);
var bandsintown = require(keys.bandsInTown);

// function APIBuilder(spotify, secret) {
//     id = id;
//     secret = secret;
// }


// // Arguments
var searchPrompt = process.argv[2];
var bandSearch = process.argv[3];
var movieSearch = process.argv.slice(3).join('+');
var songSearch = process.argv[3];




if (process.argv[2] === "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=d49b623f").then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Release Date: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.imdbRating);
            console.log("Language: " + response.data.Country);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            //node liri.js movie-this casablanca
        }
    );
}




// // Omdb
// if (process.argv[2] === "movie-this") {
//     axios
//         .get("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=d49b623f")
//         .then(function (response) {
//             console.log(response.data);
//             // console.log("Title: " + response.data.Title);
//             // console.log("Release Date: " + response.data.Released )
//         }
//         );

//     // imdbRating

// }
// // BandsinTown
if (searchPrompt === "concert-this") {
    axios
        .get("https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response.data);
        }
        );
}


// // spotify

// if (searchPrompt === "spotify-this-song") {
//     axios
//         .get("http://www.omdbapi.com/?apikey=998f6429&s=" + movieSearch)
//         .then(function (response) {
//             console.log("The movie's rating is: " + response.data);
//         }
//         );
// }



// spotify.search({ type: 'track', query: '' } {

// }
//     console.log(data);
// });



//     //  moment







//     // Api's Ajax

//     // omdbapi api



//     // bandsintown api
//configuration
require("dotenv").config();
var fs=require("fs");
var keys=require("./keys");

//pull in arguments
var action= process.argv[2];
var stuff=process.argv.slice(3).join(" ");


var checkCase=function(){
    switch(action) {
        case 'my-tweets':
            myTweets();
            break;
        case 'movie-this':
            movieThis();
            break;
        case 'spotify-this-song':
            spotifyThisSong(stuff);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Sorry I have no idea what you are asking!! Try again but properly")
    }
}

var myTweets=function(){

    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'andrea radford'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
        console.log("Finding your Tweets!! \n");
        showData=[];
        tweets.forEach(function(element) {
            showData.push(element.text);
          });
        showData=showData.join("\n\n");
        console.log(showData);
        }
    });
};

var spotifyThisSong=function(){

    if(!stuff){stuff="The sign"};
    console.log("looking for "+stuff+" on Spotify!\n\n")
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
 
    spotify.search({ type: 'track', query: stuff }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songData=data.tracks.items[0];
        showData=[
        "Song Name: "+songData.name,
        "Artist Name(s): "+songData.artists[0].name,
        "Album Name: "+songData.album.name,
        "Preveiw URL: "+songData.preview_url].join("\n");
        console.log(showData);
    });
}

var movieThis=function(){

    if(!stuff){stuff="mr nobody"};
    console.log("Looking for "+stuff+" on OMDB \n\n");
    var URL='http://www.omdbapi.com/?apikey=trilogy&t='+stuff;
    var request = require('request');

    request(URL, function (error, response, body) {
     
      var JSONdata=JSON.parse(body);
      var showData=[
      "Title of the movie: "+JSONdata.Title,
      "Year: "+JSONdata.Year,
      "IMDB Rating: "+JSONdata.imdbRating,
      "Rotten Tomatoes Rating: "+JSONdata.Ratings[1].Value,
      "Country: "+JSONdata.Country,
      "Language: "+JSONdata.Language,
      "Plot: "+JSONdata.Plot,
      "Actors: "+JSONdata.Actors].join("\n");

      console.log(showData); // Print the HTML for the Google homepage.
    });
}

var doWhatItSays=function(){
    console.log("Reading the Random file and doing what it says!");
    var file="random.txt";
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        }
        arr=data.split(",");
        action=arr[0];
        stuff=arr[1];
        checkCase();
    });
}

checkCase();
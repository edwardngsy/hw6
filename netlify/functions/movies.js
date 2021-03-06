// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')
const { stringify } = require('querystring')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // write the number of movies to the backend console
  console.log(`There are ${moviesFromCsv.length} movies in the dataset.`)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }
  
    // create a new object to hold the count and movies data
  let moviesToReturn = {}

  // start with an empty Array for the movies
  moviesToReturn.movies = []

    for (let i=0; i < moviesFromCsv.length; i++) {
      // store each movie in memory
      let movie = moviesFromCsv[i]
      // check genre and year 
      if (movie.startYear == year && movie.genres == genre && movie.runtimeMinutes!== (`\\N`) ) {
      // add the movie to the Array of movies to return
      moviesToReturn.movies.push(movie)
    }
    // add the number of movies to the count
    moviesToReturn.numResults = moviesToReturn.movies.length
  }
  console.log(`numResults = ${moviesToReturn.numResults}.`)
  console.log((`There are ${moviesToReturn.numResults} movies in the ${genre} genre in ${year}.`))


    

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(moviesToReturn) // a string of data
    }
  }
}
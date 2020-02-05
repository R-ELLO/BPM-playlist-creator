'use strics';

const apiKey = ''; //Enter API key here
//recomendations based on tempo (BPM), genre, & artist
const searchURL = 'https://api.spotify.com/v1/recommendations';
// Playlist endpoint section
//create playlist - POST (user id = username)
const makeListURL = 'https://api.spotify.com/v1/users/{user_id}/playlists';
//add tracks to playlist - POST
const = addSongURL = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks';
//remove tracks from playlist - DELETE
const = rmSongURL = 'https://api.spotify.com/v1/playlists/{playlist_id}/tracks';



function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

/* not sure about this function*/

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    $('#results').show();
    $('.errorMsg-js').empty();
    for (let i = 0; i < responseJson.tracks.length; i++) {
      $('#results-list').append(
        `<li><h4>Artist: ${responseJson.artists[i].name}</h4>
          <a href="${responseJson.artists[i].uri}" target="_blank" rel="noreferrer noopener">${responseJson.artists[i].uri}</a>
          <p>Track: ${responseJson.tracks[i].name}</p>
          <a href="${responseJson.tracks[i].uri}" target="_blank" rel="noreferrer noopener">${responseJson.tracks[i].uri}</a>
       </li>`
      )};
      if (responseJson.data.length === 0){
        $('.errorMsg-js').append(`<h4>Oops! Looks like something went wrong. Try again.</h4>`)
        $('#results').hide();
    };
}

function getMeSongs(query, bpm, maxResults=10) {
    console.log('getMeSongs initiated')
    const params = {
      'seed_genre': query,
      'target_tempo': bpm,
      limit: maxResults
    };
  
    const queryString = queryParameters(params);
    const url = searchUrl + '?' + queryString;
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(error => {
        console.log(error);
        $('.errorMsg-js').text(`Oops! Something went wrong: ${error.message}. Try again.`)
    });
}
  
function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      const searchBpm = $('#search-bpm').val();
      const maxResults = $('#max-results').val();
      getMeSongs(searchTerm, searchBpm, maxResults);
    });
}
  
$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm()
});
  
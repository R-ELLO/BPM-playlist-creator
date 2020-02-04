'use strics';

const apiKey = ''; //Enter API key here
const searchURL = '';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

/* update this function*/

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    $('#results').show();
    $('.errorMsg-js').empty();
    for (let i = 0; i < responseJson.items.length; i++) {
      $('#results-list').append(
        `<li><h4>${responseJson.items[i].name}</h4>
          <a href="${responseJson.data[i].url}" target="_blank" rel="noreferrer noopener">${responseJson.data[i].url}</a>
          <p>Description: ${responseJson.data[i].description}</p>
          <p>Directions: ${responseJson.data[i].directionsInfo}</p>
       </li>`
      )};
      if (responseJson.data.length === 0){
        $('.errorMsg-js').append(`<h4>Oops! Looks like something went wrong. Try again.</h4>`)
        $('#results').hide();
    };
}

//update this function

function getMeSongs(query, bpm, maxResults=10) {
    console.log('getMeSongs initiated')
    const params = {
      stateCode: query, //change this part
      /*something:*/ bpm,
      limit: maxResults // change this part
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
  
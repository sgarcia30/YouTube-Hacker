const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      part: 'snippet',
      key: 'AIzaSyAD1jSySSb-xhlw3AX19ppZ5q6gT55xRzI',
      per_page: 5
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div>
      <h2>
      <a class="js-result-url" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
      <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.thumbnails.title}"/>
      <a class="js-result-channel-url" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  nextPrevButtons();
}

function nextPrevButtons() {
  $('.js-search-results').append(`
    <div>
      <div class="navBut">
        <a href="">&lt; prev</a>
      </div><div class="navBut">
        <a href="">next &gt;</a>
      </div>
    </div>`);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);

// https://www.youtube.com/results?search_query=lip+sync+battle${result.nextPageToken}
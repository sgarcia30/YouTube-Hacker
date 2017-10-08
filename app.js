const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

let qVal;

function getDataFromApi(searchTerm, callback, token) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      part: 'snippet',
      key: 'AIzaSyAD1jSySSb-xhlw3AX19ppZ5q6gT55xRzI',
      per_page: 5,
      pageToken: token  
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result, index) {
  return `
    <div>
      <h2>
      <a class="js-result-url" href="https://www.youtube.com/watch?v=${result.id.videoId}" name="${result.snippet.title}" target="_blank">
      <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"/>
      <a class="js-result-channel-url" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a>
      </h2>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item, index));
  $('.js-search-results').html(results);
  nextPrevButtons(data);
  renderNumResults(data);
}

function renderNumResults(data) {
  $('.numResults').text(data.pageInfo.totalResults);
}

function nextPrevButtons(data) {
  $('.js-search-results').append(`
    <div>
      <div class="navBut">
        <button class="prev">&lt; prev</button>
      </div><div class="navBut">
        <button class="next" data-token=${data.nextPageToken}>next &gt;</button>
      </div>
    </div>`);
  nextButton(data);
  prevButton(data);
}

function prevButton(data) {
  $(".prev").on('click', function() {
    getDataFromApi(qVal, displayYouTubeSearchData, data.prevPageToken)
  });
}

function nextButton(data) {
  $(".next").on('click', function() {
    getDataFromApi(qVal, displayYouTubeSearchData, data.nextPageToken)
  });
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    qVal = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(qVal, displayYouTubeSearchData);
  });
}

$(watchSubmit);
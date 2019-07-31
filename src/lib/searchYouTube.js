var searchYouTube = (options, callback = function(){}) => {

  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?type=video&videoEmbeddable=true&order=relevance`,
    type: 'GET',
    data: {
      q: options.query,
      maxResults: options.max,
      key: options.key,
      part: 'snippet'
    },
    success: (data) => callback(data.items)
  });
};

export default searchYouTube;

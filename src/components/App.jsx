import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVideo: null,
      videoList: [],
      searchTerm: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.videoListEntryClick = this.videoListEntryClick.bind(this);
    this.sendYouTubeQuery = this.sendYouTubeQuery.bind(this);
    this.debounce = this.debounce.bind(this);
    this.debounceSearchYouTube = this.debounce(this.sendYouTubeQuery, 500).bind(this);
  }

  debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  sendYouTubeQuery() {
    const { searchTerm } = this.state;
    if (!!searchTerm) {
      const { searchYouTube } = this.props;
      const query = {query: `${searchTerm}`, max: 5, key: YOUTUBE_API_KEY};
      searchYouTube(query, (data) => {
        this.setState({
          selectedVideo: data[0],
          videoList: data,
        });
      });
    }
  }

  videoListEntryClick(selectedVideo) {
    this.setState({ selectedVideo });
  }

  handleSearchChange(e) {
    const { value } = e.target;
    this.setState({ searchTerm: value });
    this.debounceSearchYouTube();
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    this.sendYouTubeQuery();
  }

  render() {
    const { selectedVideo, videoList } = this.state;
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em><Search handleSearchChange={this.handleSearchChange} handleSearchSubmit={this.handleSearchSubmit}/></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {selectedVideo ?
              <div><h5><em>videoPlayer</em><VideoPlayer video={selectedVideo} /></h5></div>
              : null
            }
          </div>
          <div className="col-md-5">
            <div><h5><em>videoList</em><VideoList videoListEntryClick={this.videoListEntryClick} videos={videoList} /></h5></div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

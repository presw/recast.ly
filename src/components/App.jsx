import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      videoList: [],
      searchTerm: '',
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.debounce = this.debounce.bind(this);
    this.debounceSearchYouTube = this.debounce(() => console.log(this.state.searchTerm), 250).bind(this);
  }

  videoListEntryClick(e) {
    const { id } = e.target;
    const { videoList } = this.state;
    let current = null;
    for (let i = 0; i < videoList.length; i++) {
      if (id === videoList[i].id.videoId) {
        current = videoList[i];
        break;
      }
    }
    this.setState({
      current,
    });
  }

  handleSearchChange(e) {
    const { value } = e.target;
    this.setState({ searchTerm: value });
    const { searchTerm } = this.state;
    const { searchYouTube } = this.props;
    this.debounceSearchYouTube(searchTerm);
    // debounceSearchYouTube({query: `${searchTerm}`, max: 5, key: YOUTUBE_API_KEY}, (data) => {
    //   this.setState({ searchTerm: value });
    //   this.setState({
    //     current: data[0],
    //     videoList: data,
    //   });
    //   console.log(this.state.searchTerm);
    // });
  }

  // Information on creating a debounce function:
  // https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
  // https://medium.com/spritle-software/two-things-you-must-do-when-building-your-own-simple-ajax-search-64992d5c9991
  debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    }
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    const { searchYouTube } = this.props;
    searchYouTube({query: `${searchTerm}`, max: 5, key: YOUTUBE_API_KEY}, (data) => {
      this.setState({
        current: data[0],
        videoList: data,
      });
    });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em><Search onChange={this.handleSearchChange} onHandleSubmit={this.handleSearchSubmit}/></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            {current ?
              <div><h5><em>videoPlayer</em><VideoPlayer video={this.state.current} /></h5></div>
              : <div></div>
            }
          </div>
          <div className="col-md-5">
            <div><h5><em>videoList</em><VideoList onClick={this.videoListEntryClick.bind(this)} videos={this.state.videoList} /></h5></div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

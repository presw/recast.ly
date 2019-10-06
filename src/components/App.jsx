import VideoList from './VideoList.js';
import VideoListEntry from './VideoListEntry.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import videoData from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

console.log(videoData);

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
  }

  videoListEntryClick(e) {
    const { id } = e.target;
    const { videoList } = this.state;
    let clickedVid;
    for (let i = 0; i < videoList.length; i++) {
      if (id === videoList[i].id.videoId) {
        clickedVid = videoList[i];
        break;
      }
    }

    this.setState({
      current: clickedVid
    });
  }

  handleSearchChange(e) {
    const { value } = e.target;
    this.setState({ searchTerm: value });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.props.searchYouTube({query: `${searchTerm}`, max: 5, key: YOUTUBE_API_KEY}, (data) => {
      this.setState({
        current: data[0],
        videoList: data
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

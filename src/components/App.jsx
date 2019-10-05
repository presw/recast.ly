import VideoList from './VideoList.js'
import VideoListEntry from './VideoListEntry.js'
import VideoPlayer from './VideoPlayer.js'
import Search from './Search.js'
import videoData from '../data/exampleVideoData.js'
import YOUTUBE_API_KEY from '../config/youtube.js'

console.log(videoData);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: videoData[0],
      videoList: videoData
    }
  }

  componentDidMount() {
    console.log('YO YO YO YO');
    console.log(this.props.searchYouTube);
    this.props.searchYouTube({query: 'Rick Astley - Never gonna let you down', max: 5, key: YOUTUBE_API_KEY}, (data) => {
      console.log(data);
      this.setState({
        current: data[0],
        videoList: data
      })
    })
  };

  videoListEntryClick(e) {
    var id = e.target.id;
    var clickedVid;
    var videoList = this.state.videoList;
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
    var value = e.target.value;
    setTimeout(() => console.log("WHAT?!"), 500)
    // console.log("WHAT?");

  }

  handleSearchSubmit(e) {
    console.log(e);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em><Search onChange={this.handleSearchChange} onSubmit={this.handleSearchSubmit}/></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5><em>videoPlayer</em><VideoPlayer video={this.state.current} /></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><em>videoList</em><VideoList onClick={this.videoListEntryClick.bind(this)} videos={this.state.videoList} /></h5></div>
          </div>
        </div>
      </div>
    );
  }

};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

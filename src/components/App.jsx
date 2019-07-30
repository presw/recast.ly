import VideoList from './VideoList.js'
import VideoListEntry from './VideoListEntry.js'
import videoData from '../data/exampleVideoData.js'
import VideoPlayer from './VideoPlayer.js'
console.log(videoData);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: videoData[0],
      videoList: videoData
    }
  }

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
  };

  render() {

    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
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

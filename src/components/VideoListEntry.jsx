import VideoList from './VideoList.js'

console.log("Are we there yet?!");

class VideoListEntry extends React.Component {

  constructor(props) {
    super(props);
  };

  render( ) {

    return (
      <div className="video-list-entry media">
        <div className="media-left media-middle">
          <img className="media-object" src={this.props.snippet.thumbnails.default} alt="" />
        </div>
        <div className="media-body">
          <div className="video-list-entry-title">{this.props.video.snippet.title}</div>
          <div className="video-list-entry-detail">{this.props.video.snippet.description}</div>
        </div>
      </div>
    );
  }

};

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoListEntry.propTypes = {
  video: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default VideoListEntry;


// OLD STUFF
  // FROM RENDER:
  // <div className="video-list-entry media">
  //   <div className="media-left media-middle">
  //     <img className="media-object" src="https://i.ytimg.com/vi/1w8Z0UOXVaY/default.jpg" alt="" />
  //   </div>
  //   <div className="media-body">
  //     <div className="video-list-entry-title">{Video Title}</div>
  //     <div className="video-list-entry-detail">Video Description</div>
  //   </div>
  // </div>
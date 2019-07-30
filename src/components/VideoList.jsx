import videoData from '../data/exampleVideoData.js'
import VideoListEntry from './VideoListEntry.js'

var myTest = videoData;

console.log(videoData);

var VideoList = () => {
console.log("HERE HERE");
console.log(videoData.snippet);
  var vidList = videoData.map((video) =>
    <VideoListEntry key={video}
                    value={video} />
  )

  return (
    <div className="video-list">{vidList}</div>
  );
  }



// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
export default VideoList;

// OLD STUFF
  // FROM VIDEOLIST
//   {/* <div className="video-list">
//     <div><h5><em>videoListEntry</em> view BWHAAA?A here</h5></div>
//     <div><h5><em>videoListEntry</em> view BWHAAA?A here</h5></div>
//     <div><h5><em>videoListEntry</em> view BWHAAA?A here</h5></div>
//     <div><h5><em>videoListEntry</em> view BWHAAA?A here</h5></div>
//     <div><h5><em>videoListEntry</em> view BWHAAA?A here</h5></div>
//   </div>
// ); */}
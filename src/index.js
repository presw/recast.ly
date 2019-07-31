// TODO: Render the `App` component to the DOM
import App from './components/App.js';
import searchYouTube from '/src/lib/searchYouTube.js';

ReactDOM.render(<App searchYouTube={searchYouTube} />, document.getElementById('app'));

const Search = (props) => (
  <div className="search-bar form-inline">
    <form onSubmit={props.onHandleSubmit}>
      <input className="form-control" type="text" onChange={props.onChange} />
      <button className="btn hidden-sm-down">
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </form>
  </div>
);

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default Search;

var prefix = "https://cors-anywhere.herokuapp.com/";
var GIPHY_API_URL= 'https://api.giphy.com';
var GIPHY_PUB_KEY= 'EyoGWXJIBmzYmTvGY8Mr6hxTkJoI9d61'


App = React.createClass({

getInitialState() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    };
},

handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText, function(gif) {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
    }.bind(this));
},

getGif: function(searchingText, callback) {
  var url = prefix + GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
      if (xhr.status === 200) {
         var data = JSON.parse(xhr.responseText).data;
          var gif = {
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
          };
          callback(gif);
      }
  };
  xhr.send();
},

render: function() {

    var styles = {
        margin: '0 auto',
        textAlign: 'center',
        width: '90%'
    };
    return (
        <div style={styles}>
            <h1>Wyszukiwarka gifów</h1>
            <p>Znajdź gifa. Naciśnij enter, aby zobaczyć kolejne gify.</p>
               <Search onSearch={this.handleSearch}/>
               <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}/>
        </div>
    );
}
});

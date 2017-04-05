var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index.html');
});

// app.get('/js/bundle.js', function(request, response) {
//   response.render('js/bundle.js');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

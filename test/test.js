var request = require('request'),
fs = require('fs');

var url2 = 'http://localhost:2000/content/app.zip';

var r = request(url2);

r.on('response',  function (res) {
  res.pipe(fs.createWriteStream('./app.zip'));

});
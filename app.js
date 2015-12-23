var $ = require('cheerio')
var request = require('request')
var notifier = require('node-notifier');

function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html)
  // get all img tags and loop over them
  var imageURLs = []
  parsedHTML('article').map(function(i, art) {
    var dtCreation = $(art).find('li')[2].children[0].data;
    if (dtCreation.indexOf('month') > 0 || dtCreation.indexOf('day') > 0) {
      //console.dir($(art).html());
    } else {
      var creds = $(art).find('kbd');
      var user = creds[0].children[0].data;
      var pwd = creds[1].children[0].data;	
	notifier.notify({
	  'title': 'Nova senha',
	  'message': 'usuario: ' + user + ',senha: ' + pwd
	});
    }
  })
}

var domain = 'http://bugmenot.com/view/gsx.apple.com'
request(domain, gotHTML)


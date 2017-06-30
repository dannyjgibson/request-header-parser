// server.js
// where your node app starts

// init project
const express = require('express'),
      app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  let parsedHeaderInfo = {
    'ipaddress': getFirstWord(request.headers['x-forwarded-for']) ,
    'language': getFirstWord(request.headers['accept-language']),
    'software': getSoftwareInfo(request.headers['user-agent'])
  };
  response.send(parsedHeaderInfo);
});

let getFirstWord = words => {
  return words.split(',')[0];
}

let getSoftwareInfo = userAgentInfo => {
  let userAgentInfoWords =  userAgentInfo.split(' ');
  return userAgentInfoWords[1].replace('(', '') + ' ' +userAgentInfoWords[2] + ' ' + userAgentInfoWords[3].replace(')', '');
}
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

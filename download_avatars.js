var request = require('request');
let fs = require('fs');

let token = require('./secret');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    },
    authorization: token
  };
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log(response, response.statusMessage, response.headers['content-type']);
      console.log("Downloading image...");
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function() {
      console.log("Download complete.");
    })
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");



// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   let avatarUrls = result.map(x => x.avatar_url);
//   console.log("Result:", avatarUrls);
// });

console.log('Welcome to the GitHub Avatar Downloader!');
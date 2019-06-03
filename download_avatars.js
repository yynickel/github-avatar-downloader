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
      console.log("Downloading image...");
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function() {
      console.log("Download complete.");
    })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  let avatarUrls = result.map(x => x.avatar_url);
  let userNames = result.map(x => x.login);
  for (let i = 0; i < avatarUrls.length; i++) {
    downloadImageByURL(avatarUrls[i], "avatars/" + userNames[i] + ".jpg");
  }
});

console.log('Welcome to the GitHub Avatar Downloader!');
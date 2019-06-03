var request = require('request');

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  let avatarUrls = result.map(x => x.avatar_url);
  console.log("Result:", avatarUrls);
});

console.log('Welcome to the GitHub Avatar Downloader!');
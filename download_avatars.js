var request = require('request');
let fs = require('fs');
require('dotenv').config();

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    },
    authorization: process.env.GITHUB_token
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

let args = process.argv;
if (args.length !== 4) {
  setTimeout((function() {
    console.log("Program terminated due to incorrect number of arguments!\nusage: node download_avatars.js <repo owner> <repo name>");
    return process.exit(1);
  }), 50);
} else {
  console.log('Welcome to the GitHub Avatar Downloader!');
  let repoOwner = process.argv[2];
  let repoName = process.argv[3];
  getRepoContributors(repoOwner, repoName, function(err, result) {
    console.log("Errors:", err);
    let avatarUrls = result.map(x => x.avatar_url);
    let userNames = result.map(x => x.login);
    for (let i = 0; i < avatarUrls.length; i++) {
      downloadImageByURL(avatarUrls[i], "avatars/" + userNames[i] + ".jpg");
    }
  });
}
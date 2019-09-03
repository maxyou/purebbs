var path = require('path');

const sys = {
    appRoot: path.resolve(__dirname),
    appHomepage: 'http://localhost:3000'
}

const oauth_github = {
    client_id: 'xxxxxxxxxxxx',
    redirect_uri: 'http://localhost:3001/oauth/github/callback'
}

module.exports = {
    sys,
    oauth_github,
}
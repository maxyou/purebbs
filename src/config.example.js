var path = require('path');

const sys = {
    appRoot: path.resolve(__dirname),
    appHomepage: 'http://localhost:3000',
    graphql_endpoint: '/graphql'
}

const oauth_github = {
    client_id: 'xxxxxxxxxxxxxx',
    redirect_uri: 'http://localhost:3001/oauth/github/callback'
}

module.exports = {
    oauth_github,
    sys,
}
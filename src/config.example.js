var path = require('path');

const sys = {
    appRoot: path.resolve(__dirname),
    appHomepage: 'http://localhost:3000/api',
    graphql_endpoint: '/graphql'
}

/* Nginx config:

client_max_body_size 20M;

upstream purebbs{
        server 127.0.0.1:3001;
}
        
location =/ {
        try_files $uri $uri/ =404;
}
location /api/ {
        proxy_pass http://purebbs/;
}
*/

const oauth_github = {
    client_id: 'xxxxxxxxxxxxxx',
    redirect_uri: 'http://localhost:3001/oauth/github/callback'
}

module.exports = {
    oauth_github,
    sys,
}
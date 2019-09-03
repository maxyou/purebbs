var path = require('path');

const sys = {
    appRoot: path.resolve(__dirname),
    appHomepage: 'http://localhost:3000'
}

const oauth_github = {
    client_id: 'xxxxxxxxxxxx',
    redirect_uri: 'http://localhost:3001/oauth/github/callback'
}

const smtp = {
    host: "smtp.126.com", //your smtp server
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'your smtp username',
        pass: 'your smthp auth key'
    },
    email:'your email relate to smtp server',
    nickName:'email nickname',
    url_domain:'http://localhost:3000' //url domain for password reset
}

const user = {
    hmackey: 'your hmac key'
}

const db = {
    host: 'mongodb://adminname:mypassword@127.0.0.1:27017/dbname'
}

const category = [
    {//第一个特殊，必须是All，表示所有
        idStr:'category_all', 
        name: 'All'
    },
    {
        idStr:'category_dev_web', 
        name: 'Web'
    },
    {
        idStr: 'category_dev_client',    
        name: 'Client'
    },
    {
        idStr:'category_pm',
        name: 'PM'
    },
    {
        idStr: 'category_job',
        name: 'Job'
    },
    {
        idStr:'category_no_category', 
        name: 'Other'
    },
]
module.exports = {
    category,
    smtp,
    db,
    user,
    sys,
}
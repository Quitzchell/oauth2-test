const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session')
const passport = require("passport");
dotenv.config();
require('./auth');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

const app = express();
app.use(session({secret: process.env.SESSION_SECRET}))
app.use(passport.initialize());
app.use(passport.session())

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>' +
        '</br>' +
        '</br>' +
        '<a href="/protected">This route is protected</a>');
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);

app.get('/auth/failure', (req, res) => {
    res.send('something went wrong <a href="/">Try again</a>')
})

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}
    </br>
    </br>
    <a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Goodbye!')
})

app.listen(8080, () => console.log('listening on: 8080'));

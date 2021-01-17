const express= require('express');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const databaseManager = require('./databaseManager');
const router = require('./router');

const cookieParser = require('cookie-parser');


let sessionStore = new mysqlStore({}, databaseManager.connection);

let app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(cookieParser());
app.use(session({
    secret: 'Very$Secr§et',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 7*24*60*60*1000
    }
}));

app.listen(80, () => {
        console.log('Server started on Port 80')
    }
);

app.get('/', router.start);
app.get('/language', router.showClubs);
app.get('/players', router.showPlayers);
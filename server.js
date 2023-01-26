require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.connectionString)
    .then(() => {
        app.emit('ready');
        console.log('Conectado à base de dados!');
    })
    .catch(e => {console.log(e)});

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'funky cat',
    store: MongoStore.create({ mongoUrl:process.env.connectionString }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);
// poderia especificar uma rota para este middleware: app.use('/', middlewareGlobal);

app.use(routes);
app.on('ready', () => {
    app.listen(3000, () => {
        console.log('acessar página: localhost:3000');
        console.log('Escutando porta 3000');
    });
})
import express from 'express';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import initializePassport from './config/passport.config.js';
import passport from 'passport';

const app = express();

try {
    await mongoose.connect('mongodb+srv://joaquinelia:4iOyPwxbtCoxQlmS@cluster39760je.eja9lgp.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB CONNECTED')
} catch (error) {
    console.log(error);
}

// sesiones usando mongo storage
app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder397690',
    resave: true,
    saveUninitialized: true
}))

// PASSPORT
initializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(8080);
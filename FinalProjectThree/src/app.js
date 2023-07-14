import express from 'express';
import './dao/dbManagers/dbConfig.js'
import {__dirname} from './utils.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.router.js';
import Message from './dao/dbManagers/message.js';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import UsersRouter from './routes/users.js';
import passport from 'passport';
import initializePassport from './config/passport.js';

const usersRouter = new UsersRouter()

const app = express();

initializePassport()
app.use(passport.initialize())

// config params
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// config handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/users', usersRouter.getRouter());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(8080);

const io = new Server(server);
app.set('socketio', io);

const messages = [];
const messageManager = new Message();

io.on('connection', socket => {
    console.log('New client conected');

    socket.on('message', async data => {
        try {
            await messageManager.add(data);
            const messages = await messageManager.getAll();
            io.emit('messageLogs', messages);
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('authenticated', data => {
        socket.emit('messageLogs', messages);
        socket.broadcast.emit('newUserConnected', data);
    });
});


import express from 'express';
import __dirname from './utils.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import cartsRouter from './routes/carts.router.js';
import Message from './dao/dbManagers/message.js';
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import mongoose from 'mongoose';

const app = express();

// config params
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// config handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error no controlado');
})


try {
    await mongoose.connect('mongodb+srv://joaquinelia:4iOyPwxbtCoxQlmS@cluster39760je.eja9lgp.mongodb.net/ecommerce?retryWrites=true&w=majority')
} catch (error) {
    console.log(error);
}
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


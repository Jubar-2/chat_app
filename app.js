const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const loginRouter = require('./router/loginRouter');
const useRouter = require('./router/userRouter');
const inboxRouter = require('./router/inboxRouter');
const path = require('path');
const { notFoundHendler, errorHendler } = require('./middleware/common/errorHendlers');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http');





const app = express();
const server = http.createServer(app);
dotEnv.config()

const io = require("socket.io")(server);
global.io = io;

// io.on('connect', socket => {
//     console.log('A client connected');

// });


mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("sussfully connect to mongoose"))
    .catch(e => console.log(e));

app.use(express.json());


//set view template 
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.cookie_secrete));

//router
app.use('/', loginRouter);
app.use('/users', useRouter);
app.use('/inbox', inboxRouter);


//not found 
app.use(notFoundHendler);

//error
app.use(errorHendler);


//listen 
server.listen(process.env.port, () => {
    console.log('server prot is ' + process.env.port);
});


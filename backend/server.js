require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectiontodb = require('./utils/Db');
const userrouter = require('./routes/userRoutes.js');
const recieperouter = require('./routes/reciepeRoutes.js');
const notificationrouter = require('./routes/notificationRoutes.js');
const savedrouter = require('./routes/savedRoutes.js');


const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());


const PORT = process.env.PORT || 4000;
app.use('/api/auth',userrouter);
app.use('/api/reciepe',recieperouter);
app.use('/api/notification',notificationrouter)
app.use('/api/saved',savedrouter)


app.listen(PORT,()=>{
    console.log('server.is running at port 4000');
    connectiontodb()
})

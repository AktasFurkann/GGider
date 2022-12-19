const express = require('express');
require('./db/dbConnection');

const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const gelirRouter = require('./routers/gelirRouter');
const giderRouter = require('./routers/giderRouter');
const userRouter = require('./routers/userRouter');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    });

app.use('/api/gelirler', gelirRouter);

app.use('/api/giderler', giderRouter);

app.use('/api/users' , userRouter)



app.use('/' , (req,res) => {
    res.json({"hoşgeldin" : "burası backend"});
})




app.listen(3000 , () => {
console.log("server 3000 portundan ayaklandırıldı");
});
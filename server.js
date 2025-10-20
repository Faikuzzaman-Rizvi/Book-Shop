const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const {mongodb} = require("./db");
const productrouter = require("./productrouter");
const orderrouter = require("./orderrouter");

dotenv.config();
mongodb();
const server = http.createServer(app,(req,res)=>{

    let body ;
    res.on("data",chunk => {
      body += chunk;
    });

    let bodyreq;
    req.on("data", chunk =>{
      bodyreq += chunk;
    })
});
const io = new Server(server,{ 'cors':{'origin':'*' }});

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// If you want to always serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/OrderProduct', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Order.html'));
});

app.use('/upload',express.static(path.join(__dirname,'public/uploads')));

app.use('/api/products',productrouter);
app.use('/api/orders',orderrouter);


io.on('connection',(socket)=>{

     console.log('new connection with' + socket.id);
     socket.on('currentstock',(product)=>{

        console.log('new product studust ' + product);

        io.emit('productupdate',product);
     });

     socket.on('disconnect',()=>{

         console.log('disconnect is made by client having ' + socket.id);

     })

});


const port =  5000;
server.listen(port,()=>{

    console.log('server is running at port ' + port)
})



const express = require('express');
const connectDB = require('./config/db');
// const cors = require("cors");
const app = express();
const server = require('http').Server(app);
//connect Database
connectDB();
// app.use(cors());

//Init Middleware
app.use(express.json({ extend: false }));
app.get('/', (req, res) => res.send('API Running'));
//Define Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/request', require('./routes/api/request'));
app.use('/api/searchbar', require('./routes/api/searchbar'));


const PORT = process.env.PORT || 5000;

// const io = require("socket.io")(server, {
//     cors : {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// })

// io.on('connection', (socket) => {
//     socket.emit('me', socket.id);

//     socket.on('disconnect', () => {
//         socket.broadcast.emit("callended");
//     });

//     socket.on("calluser", ({userToCall, singalData, from, name}) => {
//         io.to(userToCall).emit("calluser", {signal: singalData, from, name});
//     });
    
//     socket.on("answercall", (data) =>{
//         io.to(data.to).emit("callaccepted", data.signal);
//     });
// })

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
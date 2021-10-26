const express = require('express');
const connectDB = require('./config/db');

const app = express();
//connect Database
connectDB();

//Init Middleware
app.use(express.json({ extend: false }));

app.get('/', (req, res) => res.send('API Running'));
//Define Route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/request', require('./routes/api/request'));
app.use('/api/calendar', require('./routes/api/calendar'));
app.use('/api/searchbar', require('./routes/api/searchbar'));
// app.use('/api/request_times', require('.routes/api/request_times'));

// Check if the slack channel is workingfsdsdfsdkhfajksdfhjklashfajklsd

const PORT = process.env.PORT || 5000;
// const server = new Ap

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
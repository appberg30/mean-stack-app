const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');


mongoose.connect(config.database);

mongoose.connection.on('connected', () =>{
	console.log('connected to atabase');
});
const app = express();

const port = 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req,res) =>{
	res.send('Hello');
});
app.listen( port, ()=>{
	console.log('server started on port '+ port);
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
//const Users = require('./routes/api/Users')
//const Motives = require('./routes/api/Motives')
const cors = require('cors')

const app = express();

// ======================================================================================
// Middleware
app.use(bodyParser.json());
app.use(cors())

// ======================================================================================
// Connect to mongoDB
const mongoURL = 'mongodb+srv://avatanab:mongopower@mongodb-r6m0u.mongodb.net/SE3316Lab5?retryWrites=true&w=majority';
mongoose.connect(mongoURL, { useNewUrlParser: true ,  useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// ======================================================================================
// Use Routes
//app.use('/api/users', Users);
//app.use('/api/motives', Motives);

// ======================================================================================
// Start Server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend Server listening on port ${port}`));
const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());


const usersRoute = require('./routes/usersRoute');
const artistsRoute = require('./routes/artistsRoute');

app.use('/api/users',usersRoute);
app.use('/api/artists', artistsRoute);




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
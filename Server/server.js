const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());


const usersRoute = require('./routes/usersRoute');
const artistsRoute = require('./routes/artistsRoute');
const imagesRoute = require('./routes/imageRoute')
const moviesRoute = require('./routes/moviesRoute')


app.use('/api/users',usersRoute);
app.use('/api/artists', artistsRoute);
app.use('/api/images', imagesRoute);
app.use('/api/movies', moviesRoute);




const port = process.env.PORT || 5000;

//for render deployment
const path = require("path");
__dirname = path.resolve();



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Client", "build", "index.html"));
  });
}




app.listen(port, () => console.log(`Server started on port ${port}`));
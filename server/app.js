const express = require('express');
const cors = require('cors');
const path = require('path');
require('./db/mongoose');

const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
const podcastInfoRoute = require('./routes/podcastInfo');
const podcastDelete = require('./routes/delete');



const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoute,uploadRoute,podcastInfoRoute,podcastDelete);

app.use(express.static(path.join(__dirname, '../client/build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', '../client/build/index.html'));
});



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`server is up on port ${PORT}`)
})
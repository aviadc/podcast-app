const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload')
const podcastInfoRoute = require('./routes/podcastInfo')



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user',authRoute,uploadRoute,podcastInfoRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log('server is up')
})
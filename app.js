const express = require('express');
const cors = require('cors');
require('./db/mongoose');

const route = require('./routes/auth');



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user',route);



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log('server is up')
})
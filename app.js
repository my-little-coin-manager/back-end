require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const connect = require('./schemas');

const marketRouter = require('./routes/bookmark');
const userRouter = require('./routes/user');

const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  connect(process.env.MONGO_DB);
  console.log('서버실행');
});

app.use('/api', [marketRouter]);
app.use('/api', [userRouter]);

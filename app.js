require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const connect = require('./schemas');

const marketRouter = require('./routes/bookmark');
const userRouter = require('./routes/user');

const port = 3001;

let corsOptions = {
  origin: '*', // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  connect(process.env.MONGO_DB);
  console.log('서버실행');
});

app.use('/api', [marketRouter]);
app.use('/api', [userRouter]);

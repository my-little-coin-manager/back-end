require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connectDB = require('./schemas');

const marketRouter = require('./routes/bookmark');
const userRouter = require('./routes/user');
const historyRouter = require('./routes/history');

const port = 8080;

let corsOptions = {
  origin: '*', // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', [marketRouter, userRouter, historyRouter]);

app.listen(port, () => {
  connectDB(process.env.MONGO_DB);
  console.log('서버실행');
});

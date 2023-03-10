const mongoose = require('mongoose');

const connect = (URL) => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'MLCM', //dbName으로 설정하면 된다.
    })
    .catch((err) => console.log(err));
};

mongoose.connection.on('disconnected', (err) => {
  console.error('몽고디비 연결 에러', err);
});

module.exports = connect;

const mongoose = require('mongoose');
const config = require('../config/config');

module.exports = () => {
    const connect = () => {
      if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
      }
      mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
      
    };
    connect();
    
    //몽고디비 연결 성공시 확인
    mongoose.connection.once('open', () => {
        console.log('몽고디비 연결 성공');
    });
    //에러발생시 콘솔로 에러 확인하도록 listener 등록
    mongoose.connection.on('error', (error) => {
      console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', () => {
      console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
      connect();
    });
    require('./user');
  
  };
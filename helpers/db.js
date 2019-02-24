const mongoose = require('mongoose');

module.exports = () =>{
  mongoose.connect('mongodb://osman:123qweasd@ds349045.mlab.com:49045/heroku_kbk6kt6g', { useNewUrlParser: true });
  mongoose.connection.on('open',()=> {
      console.log('Connect Db.');
  });
    mongoose.connection.on('error',(err)=> {
      console.log('Connect err',err);
  });
};
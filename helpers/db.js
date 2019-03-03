const mongoose = require('mongoose');

module.exports = () =>{
  mongoose.connect('mongodb://osman:123qweasd@ds357955.mlab.com:57955/heroku_ww2wxp7h', { useNewUrlParser: true });
  mongoose.connection.on('open',()=> {
      //console.log('Connect Db.');
  });
    mongoose.connection.on('error',(err)=> {
      console.log('Connect err',err);
  });
};

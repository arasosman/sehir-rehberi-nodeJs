const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
       type:String,
       required:true
    },
    category: String,
    country: String,
    year: Number,
    img: String,
    imdb_score: Number,
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie',MovieSchema);

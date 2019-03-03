const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NumberSchema = new Schema({
    number: {
        type:Number,
        required:true
    },
    description: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    viewCount:Number,
    date : {
        type: Date,
        default: Date.now
    },
    status:Number
});

module.exports = mongoose.model('number',NumberSchema);

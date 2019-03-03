const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type:Number,
        required:true
    },
    detail: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    tags:String,
    img:String,
    date : {
        type: Date,
        default: Date.now
    },
    status:Number
});

module.exports = mongoose.model('blog',BlogSchema);

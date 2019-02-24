const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie')

/* GET home page. */
router.get('/',(req, res, next) => {

    const promise = Movie.find({});

    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });
});

router.get('/top10',(req, res, next) => {
    const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

    promise.then( (data) => {
        res.json(data)
    }).catch( (err) => {
        res.json(err)
    });
});

router.get('/:movie_id',(req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);

    promise.then( (data) => {
        res.json(data)
    }).catch( (err) => {
        res.json(err)
    });
});


router.put('/:movie_id',(req, res, next) => {
    const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body);

    promise.then( (data) => {
        res.json({
            status : true,
            data: req.body
        })
    }).catch( (err) => {
        res.json(err)
    });
});


router.delete('/:movie_id',(req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then( (movie) => {
        res.json({
            status : true
        })
    }).catch( (err) => {
        res.json(err)
    });
});

router.post('/', (req, res, next) => {
    const movie = new Movie(req.body);

    const promise = movie.save();

    promise.then((data)=>{
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });

});

module.exports = router;

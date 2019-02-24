const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();

const server = require('../app');


chai.use(chaihttp);

let token,movie_id;

describe('/api/movie test', () => {
    before((done => {
        chai.request(server)
            .post('/login')
            .send({username: 'arasosman', password: '123qwe'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    }));

    describe('/get movies', () => {
        it('it should get all movies ', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('authorization', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    });

    describe('Post Movies', () => {
        it('it should post movies', (done) => {
            let movies = {
                title: "test film",
                year: 1999,
                category: "deneme",
                imdb_score: 8.8
            };

            chai.request(server)
                .post('/api/movies')
                .send(movies)
                .set('authorization', token)
                .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('title');
                   res.body.should.have.property('category');
                   res.body.should.have.property('year');
                   res.body.should.have.property('imdb_score');
                   movie_id= res.body._id;
                   done();
                });
        });
    });

    describe('put Movies', () => {
        it('it should put movies', (done) => {
            let movies = {
                title: "test put film",
                year: 2001,
            };

            chai.request(server)
                .put('/api/movies/'+movie_id)
                .send(movies)
                .set('authorization', token)
                .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('data');
                   res.body.should.have.property('status');
                   done();
                });
        });
    });

    describe('delete Movies', () => {
        it('it should delete movies', (done) => {

            chai.request(server)
                .delete('/api/movies/'+movie_id)
                .set('authorization', token)
                .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('status');
                   done();
                });
        });
    });
});


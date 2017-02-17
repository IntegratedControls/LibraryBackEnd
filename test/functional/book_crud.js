
const Book1 = require('../../model/book/book-schema');
mockgoose(mongoose).then(() => {
  global.server = require('../../index');
  done();
}, undefined);

describe('The library feature',  () => {
  beforeEach((done) => {

    Book1.collection.drop();
    Book1.ensureIndexes(() => {
      done();
    });
  });

  it('should create a new book', (done) => {

    chai.request(server)
    .post('/book/')
    .set({ origin: process.env.AllowUrl })
    .send({ title: 'foobar', type: 'book' })
    .end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });

  it('should find a book', (done) => {
    chai.request(server)
    .get('/book/getall')
    .set({ origin: process.env.AllowUrl })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should post an array of new books', done => {
    chai.request(server)
    .post('/book/')
    .set({ origin: process.env.AllowUrl })
    .send([{ title: 'foobar', type: 'book' }, { title: 'JFK', type: 'PDF' }])
    .end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });

  // when you call with a non-existent path, be sure to get a 404.
  it('should pass for the error', done => {
    chai.request(server)
    .put('/book/johnny')
    .set({ origin: process.env.AllowUrl })
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

  // it('should respond with error on find a book', (done) => {
  //   // server1 = require('../../index');
  //   chai.request(server)
  //     .get('/book/getall')
  //     .set({ origin: 'http://walla.com' })
  //     .end((err, res) => {
  //       expect(res).to.have.status(401);
  //       done();
  //     });
  // });
});


const Book1 = require('../../model/book/book-schema');
mockgoose(mongoose).then(() => {
  global.server = require('../../index');
  done();
});

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

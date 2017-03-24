const Book1 = require('../../model/book/book-schema');
const authUtils = require('../../auth/authUtils');

describe('The library feature',  () => {
  beforeEach((done) => {
    Book1.collection.drop();
    Book1.ensureIndexes();
    mockgoose(mongoose).then(() => {
      global.server = require('../../index');
      global.allowedUrl = JSON.parse(process.env.AllowUrl).urls[0];
      done();
    });
  });

  it('should create a new book', (done) => {
    chai.request(server)
    .post('/book/create')
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .send({ title: 'foobar', type: 'hardback' })
    .end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });

  it('should return all books', (done) => {
    chai.request(server)
    .get('/book/getall')
    .set({ origin: allowedUrl })
    // .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .end((err, res) => {
      expect(res).to.have.status(200);
      console.log(typeof res);
      done();
    });
  });

  it('should post an array of new books', done => {
    chai.request(server)
    .post('/book/create')
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .send([{ title: 'foobar', type: 'hardback' }, { title: 'JFK', type: 'PDF' }])
    .end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });

  // when you call with a non-existent path, be sure to get a 404.
  it('should pass for the error', done => {
    chai.request(server)
    .put('/book/johnny')
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

  it('should modify a book', (done) => {
    const Book = new Book1();
    Book.title = 'Flow Measurement';
    Book.type = 'hardback';
    Book.checkedOutBy = '123456';
    Book.save();
    chai.request(server)
    .put('/book/update/' + Book.id)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .send({ checkedOutBy: '' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.nModified > 0);
      done();
    });
  });
});

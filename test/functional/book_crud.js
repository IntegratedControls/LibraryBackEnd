
const Book1 = require('../../model/book/book-schema');
let allowedUrl = '';

mockgoose(mongoose).then(() => {
  global.server = require('../../index');
  allowedUrl = process.env.AllowUrl;
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
    .set({ origin: allowedUrl })
    .send({ title: 'Flow Measurement', type: 'hardback' })
    .end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });

  it('should find a book', (done) => {
    chai.request(server)
    .get('/book/getall')
    .set({ origin: allowedUrl })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should post an array of new books', done => {
    chai.request(server)
    .post('/book/')
    .set({ origin: allowedUrl })
    .send([{ title: 'Flow Measurement', type: 'hardback' }, { title: 'JFK', type: 'PDF' }])
    .end((err, res) => {
      expect(res).to.have.status(201);
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
    .send({ checkedOutBy: '' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.nModified > 0);
      // expect(res.Book.checkedOutBy = '');
      done();
    });
  });

});

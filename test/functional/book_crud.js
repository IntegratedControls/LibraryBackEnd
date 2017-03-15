

const Book1 = require('../../model/book/book-schema');
// const server1 = require('../../index');
let allowedUrl = '';

const  mock = mockgoose(mongoose);

mock.then(() => {
  global.server = require('../../index');
  allowedUrl = JSON.parse(process.env.AllowUrl).urls[0];
  done();
});

mock.catch(err => {
  // "use strict";
  console.log(err);
});

// use this process rather to handle error rejections.
// error rejections not functioning for manual chaining or catching.
process.on('unhandledRejection', (err, p) => {
  console.log('');
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
    .set({ origin: allowedUrl })
    .send({ title: 'foobar', type: 'book' })
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
    .set({ origin: allowedUrl })
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

  it('should respond with error on find a book', (done) => {
    // server1 = require('../../index');
    chai.request(server)
    .get('/book/find/one')
    .set({ origin: allowedUrl })
    .end((err, res) => {
      console.log(res.status);
      // expect(res).to.have.status(200);
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
      done();
    });
  });
});

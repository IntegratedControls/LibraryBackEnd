
const  mock = mockgoose(mongoose);

mock.then(() => {
  process.env.CORSisON = false;
  global.server = require('../../index');

  done();
});

mock.catch(err => {
  // "use strict";
  console.log(err);
});


describe('the route redirect', () => {
  beforeEach((done) => {

    done();
  });

  it('should redirect to / if CORS is true and allowURL is incorrect', (done) => {
    chai.request(server)
    .get('/book/getall')
    .set({ origin: 'http://bogus.com' })
    .end((err, res) => {

      expect(res).to.have.status(200);
      done();
    });
  });
});

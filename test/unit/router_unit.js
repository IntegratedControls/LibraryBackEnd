// //TODO fake server with Sinon
// Server2 = require('../../index');
// const  ServerMock = sinon.createFakeServer();
//
// mock.then(() => {
//   process.env.CORSisON = true;
//
//
//   done();
// });
//
// mock.catch(err => {
//   // "use strict";
//   console.log(err);
// });
//
//
// describe('the route redirect', () => {
//   beforeEach((done) => {
//
//     done();
//   });
//
//   it('should redirect to / if CORS is true and allowURL is incorrect', (done) => {
//     chai.request(FAKEserver)
//     .get('/book/getall')
//     .set({ origin: 'http://bogus.com' })
//     .end((err, res) => {
//
//       expect(res).to.have.status(200);
//       done();
//     });
//   });
// });

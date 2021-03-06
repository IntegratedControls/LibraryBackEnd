const User1 = require('../../model/user/user-schema');
const authUtils = require('../../auth/authUtils');

describe('functional test Create User',  () => {
  beforeEach((done) => {
    User1.collection.drop();
    User1.ensureIndexes();
    mockgoose(mongoose).then(() => {
      global.server = require('../../index');
      global.allowedUrl = JSON.parse(process.env.AllowUrl).urls[0];
      done();
    });
  });

  it('should create a new user', (done) => {
    const User = new User1();
    User.name = 'foo';
    User.email = 'foo@example.com';
    User.save((err) => {
      const id = User._id;
      expect(id).to.not.be.null;
      done();
    });
  });


  it('should not update a user when using invalid userType', (done) => {
    // const User = new User1();
    const Uid = '587298a376d5036c68b6ef12';
    chai.request(server)
    .put('/user/' + Uid)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .send({ userType: 'coolGuy' })
    .end((err, res) => {
      // expect(res).to.have.status(500);
      expect(res).to.have.status(404);
      done();
    });
  });

  it('should modify a user', (done) => {
    const User = new User1();
    User.name = 'foo';
    User.email = 'foo2@example.com';
    User.save();
    chai.request(server)
    .put('/user/' + User.id)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .send({ name: 'foobar' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.nModified > 0);
      // TODO: Write a GET request to verify that user's name has been changed
      done();
    });
  });

  it('should find a user by id', (done) => {
    const User = new User1();
    User.name = 'foo';
    User.email = 'foo3@example.com';
    User.save();
    chai.request(server)
    .get('/user/' + User._id)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should NOT find a user by id', (done) => {
    // const User = new User1();
    const id = '587298a376d5036c68b6ef12';
    chai.request(server)
    .get('/user/' + id)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });

  it('should return an error in update() when nothing was updated', (done) => {
    // const User = new User1();
    const Uid = '587298a376d5036c68b6ef12';
    chai.request(server)
    .put('/user/' + Uid)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .send({ alien: 'yes' })
    .end((err, res) => {
      expect(err).to.be.an('error');
      done();
    });
  });

  it('should return 400 error when Id not valid on update', (done) => {
    const Uid = '5872';
    chai.request(server)
    .put('/user/' + Uid)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .send({ alien: 'yes' })
    .end((err, res) => {
      expect(err).to.be.an('error');
      expect(res).to.have.status(400);
      done();
    });
  });

  it('should throw an error in findById()', (done) => {
    const id = 'TYgsfn';
    chai.request(server)
    .get('/user/' + id)
    .set({ origin: allowedUrl })
    .set('authorization', 'Bearer ' + authUtils.createJWT('foo2@example.com'))
    .end((err, res) => {
      expect(err).to.be.an('error');
      done();
    });
  });

});

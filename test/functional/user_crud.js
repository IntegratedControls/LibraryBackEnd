const User1 = require('../../model/user/user-schema');
mockgoose(mongoose).then(() => {
  global.server = require('../../index');
  done();
});

describe('functional test Create User',  () => {
  beforeEach((done) => {
    User1.collection.drop();
    User1.ensureIndexes();
    done();
  });
});

it('should create a new user', (done) => {
  const User = new User1();
  User.name = 'foo';
  User.email = 'foo@bar.com';
  User.save((err) => {
    const id = User._id;
    expect(id).to.not.be.null;
    done();
  });
});

  it('should not update a user', (done) => {
    const User = new User1();
    const Uid = '587298a376d5036c68b6ef12';
    chai.request(server)
        .put('/user/' + Uid)
        .set({ origin: process.env.AllowUrl })
        .send({ userType: 'coolGuy' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.error);
          done();
        });
    // done();
  });

it('should modify a user', (done) => {
  const User = new User1();
  User.name = 'foo';
  User.email = 'foo2@bar.com';
  User.save();
  chai.request(server)
        .put('/user/' + User.id)
        .set({ origin: process.env.AllowUrl })
        .send({ name: 'foobar' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.nModified > 0);
          // TODO: Write a GET request to verify that user's name has been changed
          done();
        });

});

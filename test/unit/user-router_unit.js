const User2 = require('../../model/user/user-schema');
mockgoose(mongoose).then(() => {
  global.server = require('../../index');
  done();
});

describe('functional test Create User', () => {
  beforeEach((done) => {
    User2.collection.drop();
    User2.ensureIndexes();
    done();
  });
});

it('should get the new user by id', (done) => {
  const User = new User2();
  User.name = 'foo2';
  User.email = 'foo2@bar.com';
  User.save((err) => {
    const Uid = User._id;
    chai.request(server)
      .get('/user/' + Uid)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

it('should update the new user by id', (done) => {
  const User = new User2();
  User.name = 'foo3';
  User.email = 'foo3@bar.com';
  User.save((err) => {
    const Uid = User._id;
    chai.request(server)
        .put('/user/' + Uid)
        .send({ userType: 'coolGuy' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
  });
});

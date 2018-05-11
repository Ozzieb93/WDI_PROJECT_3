/* global api, describe, it, expect, beforeEach */

const Job = require('../../models/job');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

const userData = {
  firstname: 'test',
  surname: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};
const jobData = {
  category: 'test',
  description: 'test',
  duration: 'test'
};

let token;
let jobId;

describe('PUT /job/:id', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Job.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(() => Job.create(jobData))
      .then(wine => {
        jobId = wine._id;
      })
      .then(() => done());
  });

  it('should return a 200 response with a token', done => {
    api
      .put(`/api/jobs/${jobId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(jobData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

});

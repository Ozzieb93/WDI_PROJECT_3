const User = require('../models/user');

function usersIndex(req, res, next){
  User
    .find()
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function usersShow(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if(!user) return res.sendStatus(404);
      res.json(user);
    })
    .catch(next);
}

function usersUpdate(req, res, next){
  User
    .findById(req.params.id)
    .then(user => {
      if (!user) return res.sendStatus(404);
      return Object.assign(user, req.body);
    })
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function usersDelete(req, res, next){
  User
    .findById(req.params.id)
    .then(user => {
      if(!user) return res.sendStatus(404);
      return user.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};

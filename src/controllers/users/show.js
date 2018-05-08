UsersShowCtrl.$inject = ['User', '$state'];


function UsersShowCtrl(User, $state) {
  this.user = {};

  //find a specific user
  User.findById($state.params.id)
    .then(res => this.user = res.data);

}

export default UsersShowCtrl;

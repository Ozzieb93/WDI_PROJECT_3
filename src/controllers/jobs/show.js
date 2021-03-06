JobsShowCtrl.$inject = ['Job', '$state'];

function JobsShowCtrl(Job, $state) {
  this.job = {};
  this.data = {};
  this.distance = null;

  const vm = this;

  vm.job = {};
  vm.data = {};

  Job
    .findById($state.params.id)
    .then(res => vm.job = res.data);

  function handleDelete() {
    Job
      .removeById($state.params.id)
      .then(() => $state.go('jobsIndex'));
  }

  function handleMessageCreate() {

    if(vm.form.$invalid) return false;
    console.log(vm.data);

    Job
      .messageCreate($state.params.id, vm.data)
      .then(res => vm.job = res.data);
  }

  function handleMessageDelete(message) {
    Job
      .messageDelete($state.params.id, message._id)
      .then(res => vm.job = res.data);
  }

  function handleApplicantCreate() {

    if(vm.form.$invalid) return false;
    console.log(vm.data);
    Job
      .applicantCreate($state.params.id, vm.data)
      .then(res => vm.job = res.data)
      .then(handleMessageCreate);

  }

  function handleApplicantDelete(applicant) {
    Job
      .applicantDelete($state.params.id, applicant._id)
      .then(res => vm.job = res.data);
  }


  function handleApplicantAccept(applicant) {
    Job
      .applicantAccept($state.params.id, applicant._id)
      .then(() => applicant.status = 'accepted')
      .then(handleStatusProgress);
  }

  function handleApplicantReject(applicant) {
    Job
      .applicantReject($state.params.id, applicant._id)
      .then(() => applicant.status = 'rejected');
  }

  function handleStatusProgress() {
    Job
      .statusProgress($state.params.id)
      .then(() => vm.status = 'in progress')
      .then(location.reload());
  }

  function handleStatusFinish() {
    Job
      .statusFinish($state.params.id)
      .then(() => vm.status = 'finished')
      .then(location.reload());
  }

  function handleStatusReview() {
    Job
      .statusReview($state.params.id)
      .then(() => vm.status = 'reviewed')
      .then(location.reload());
  }


  this.handleDelete = handleDelete;
  this.handleMessageCreate = handleMessageCreate;
  this.handleMessageDelete = handleMessageDelete;
  this.handleApplicantCreate = handleApplicantCreate;
  this.handleApplicantDelete = handleApplicantDelete;
  this.handleApplicantAccept = handleApplicantAccept;
  this.handleApplicantReject = handleApplicantReject;
  this.handleStatusProgress = handleStatusProgress;
  this.handleStatusFinish = handleStatusFinish;
  this.handleStatusReview = handleStatusReview;
}

export default JobsShowCtrl;

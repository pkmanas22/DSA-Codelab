const routes = {
  root: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  problems: {
    all: '/problems',
    problem: '/problems/:problemId',
  },
  submissions: {
    all: '/submissions',
    submission: '/submissions/:submissionId',
  },
  playlist: 'playlist',

  // admin
  admin: {
    dashboard: '/admin',
    createProblem: '/admin/create',
    updateProblem: '/admin/update/:problemId',
  },
};

export default routes;

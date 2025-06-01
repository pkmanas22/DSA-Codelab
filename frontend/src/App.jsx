import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import routes from './routes';
import Layout from './layouts/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import ProblemSet from './components/ProblemSet';
import Problem from './components/Problem';
import Submissions from './components/Submissions';
import Playlist from './components/Playlist';
import AdminDashboard from './components/AdminDashboard';
import CreateProblem from './components/CreateProblem';
import UpdateProblem from './components/UpdateProblem';
import { PageNotFound } from './components/common';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route path={routes.root} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />

          <Route path={routes.profile} element={<Profile />} />

          <Route path={routes.problems.all} element={<ProblemSet />} />
          <Route path={routes.problems.problem} element={<Problem />} />
          <Route path={routes.submissions} element={<Submissions />} />
          <Route path={routes.playlist} element={<Playlist />} />

          <Route path={routes.admin.dashboard} element={<AdminDashboard />} />
          <Route path={routes.admin.createProblem} element={<CreateProblem />} />
          <Route path={routes.admin.updateProblem} element={<UpdateProblem />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

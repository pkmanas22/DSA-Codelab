import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import routes from '../../routes';
import { Bell, BookOpen, Code, LogOut, Trophy, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthLogout } from '../../hooks/reactQuery/useAuthApi';
import toast from 'react-hot-toast';

const RightSideNavbar = () => {
  const { authUser, isAuthenticated, clearAuth } = useAuthStore();

  const { mutate: authLogoutHandle } = useAuthLogout();

  const navigate = useNavigate();

  const handleLogout = () => {
    authLogoutHandle(null, {
      onSuccess: () => {
        clearAuth();
        navigate('/login');
      },
      onError: (err) => {
        toast.error(err.error || 'Something went wrong');
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to={routes.login}
          className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
        >
          Sign In
        </Link>
        <Link to={routes.register} className="btn btn-primary">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Notifications */}
      <div className="relative">
        <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* User Stats (Desktop) */}
      <div className="hidden xl:flex items-center gap-4 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-600/30">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-slate-200">{authUser?.streak || 45}</span>
        </div>
        <div className="w-px h-4 bg-slate-600"></div>
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-slate-200">{authUser?.solved || 234}</span>
        </div>
      </div>

      {/* User Dropdown */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-slate-700/50">
          <div className="w-10 rounded-full ring-2 ring-slate-600/30 hover:ring-emerald-500/50 transition-all duration-200">
            <img
              src={authUser?.image || 'https://avatar.iran.liara.run/public/boy'}
              alt="User Avatar"
              className="object-cover rounded-full"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-slate-800 border border-slate-600/30 rounded-2xl w-64 backdrop-blur-xl"
        >
          {/* User Info */}
          <li className="p-3 border-b border-slate-600/30 mb-2">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-slate-200">{authUser?.name}</p>
              <p className="text-sm text-slate-400">{authUser?.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-slate-300">
                    {authUser?.streak || 45} day streak
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Code className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-slate-300">{authUser?.solved || 234} solved</span>
                </div>
              </div>
            </div>
          </li>

          {/* Menu Items */}
          <li>
            <Link
              to={routes.profile}
              className="flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span className="text-slate-200">My Profile</span>
            </Link>
          </li>

          <li>
            <Link
              to={routes.submissions}
              className="flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-lg transition-all duration-200"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span className="text-slate-200">My Submissions</span>
            </Link>
          </li>

          {authUser?.role === 'ADMIN' && (
            <li>
              <Link
                to={routes.admin.createProblem}
                className="flex items-center gap-3 p-3 hover:bg-emerald-600/20 rounded-lg transition-all duration-200 text-emerald-400"
              >
                <Code className="w-4 h-4" />
                <span>Add Problem</span>
              </Link>
            </li>
          )}

          <li className="mt-2 pt-2 border-t border-slate-600/30">
            <button
              className="flex items-center gap-3 p-3 hover:bg-red-600/20 rounded-lg transition-all duration-200 text-red-400 w-full"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightSideNavbar;

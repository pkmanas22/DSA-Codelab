import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import routes from '../../routes';
import RightSideNavbar from './RightSideNavbar';

const Header = () => {
  const { authUser } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full bg-base-300 text-base-content from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to={routes.root} className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.svg"
                  alt="DSA CodeLab"
                  className="h-9 w-9 p-1.5 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-200 blur-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent hidden sm:block">
                DSA CodeLab
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to={routes.problems.all}
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
              >
                Problems
              </Link>
              {/* <Link
                to="/contests"
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
              >
                Contests
              </Link>
              <Link
                to="/discuss"
                className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
              >
                Discuss
              </Link> */}

              {authUser?.role === 'ADMIN' && (
                <>
                  <li>
                    <Link
                      to={routes.admin.dashboard}
                      className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={routes.admin.createProblem}
                      className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
                    >
                      Add Problem
                    </Link>
                  </li>
                </>
              )}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <RightSideNavbar />

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

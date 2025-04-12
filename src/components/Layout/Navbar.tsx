import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BarChart, Clock, Users, Settings, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                Impause
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/dashboard"
                  className="text-white hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/finance-wrapped"
                  className="text-white hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Finance Wrapped
                </Link>
                <Link
                  to="/impulse-buying"
                  className="text-white hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Impulse Buffer
                </Link>
                <Link
                  to="/accountability-buddy"
                  className="text-white hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Buddies
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/settings"
              className="text-white hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Settings
            </Link>
            <Link
              to="/signin"
              className="text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium border border-transparent"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-white text-purple-700 hover:bg-white/90 px-3 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/20 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/10">
          <Link
            to="/dashboard"
            className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Dashboard
            </div>
          </Link>
          <Link
            to="/finance-wrapped"
            className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Finance Wrapped
            </div>
          </Link>
          <Link
            to="/impulse-buying"
            className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Impulse Buffer
            </div>
          </Link>
          <Link
            to="/accountability"
            className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Accountability
            </div>
          </Link>
          <Link
            to="/settings"
            className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
            onClick={toggleMenu}
          >
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </div>
          </Link>
          <div className="border-t border-white/10 my-2 py-2">
            <Link
              to="/signin"
              className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-2">
                <LogIn className="h-5 w-5" />
                Sign in
              </div>
            </Link>
            <Link
              to="/signup"
              className="bg-white text-purple-700 mt-2 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

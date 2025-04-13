import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BarChart, Clock, Users, Settings, LogOut, LogIn, User } from "lucide-react";
import { logout } from "../../services/authService";
import { isAuthenticated } from "../../utils/auth";

const UnifiedNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());
  const navigate = useNavigate();

  // Check authentication status when component mounts and when auth events occur
  useEffect(() => {
    const checkAuthStatus = (): void => {
      const authStatus = isAuthenticated();
      console.log("Checking auth status:", authStatus);
      setIsLoggedIn(authStatus);
    };

    // Check on mount
    checkAuthStatus();

    // Set up event listeners for auth changes
    const handleAuthChange = (): void => {
      console.log("Auth change event received");
      checkAuthStatus();
    };

    // Listen for the authChange event (this is what your auth.ts dispatches)
    window.addEventListener("authChange", handleAuthChange);
    
    // Listen for storage changes (for cross-tab support)
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === 'auth_token') {
        console.log("Storage event for auth token");
        checkAuthStatus();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Clean up event listeners
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      console.log("Logged out successfully");
      // No need to manually set isLoggedIn as the logout function 
      // will trigger the authChange event
      navigate("/"); // Redirect to homepage after logout
      toggleMenu(); // Close mobile menu if open
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
                {isLoggedIn ? (
                  // Navigation links for logged-in users
                  <>
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
                  </>
                ) : (
                  // Navigation links for logged-out users
                  <>
                    
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              // Actions for logged-in users
              <>
                <Link
                  to="/settings"
                  className="text-white hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Settings
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:bg-white/10 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium border border-white"
                >
                  Log out
                </button>
              </>
            ) : (
              // Actions for logged-out users
              <>
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
              </>
            )}
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
          {isLoggedIn ? (
            // Mobile navigation for logged-in users
            <>
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
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-white/10 w-full text-left block px-3 py-2 rounded-md text-base font-medium"
                >
                  <div className="flex items-center gap-2">
                    <LogOut className="h-5 w-5" />
                    Log out
                  </div>
                </button>
              </div>
            </>
          ) : (
            // Mobile navigation for logged-out users
            <>
              <Link
                to="/features"
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Features
                </div>
              </Link>
              <Link
                to="/pricing"
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pricing
                </div>
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  About
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UnifiedNavbar;
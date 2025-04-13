import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotSignedInNavbar from "./NotSignedInNavbar"; // Rename to match proper capitalization
import { isAuthenticated } from "../../utils/auth";

const AuthAwareNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    setIsLoggedIn(isAuthenticated());

    // Listen for auth changes (like when login/logout happens)
    const handleStorageChange = () => {
      setIsLoggedIn(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for same-tab auth changes
    window.addEventListener("authChange", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  return isLoggedIn ? <Navbar /> : <NotSignedInNavbar />;
};

export default AuthAwareNavbar;
"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, BarChart, Clock, Users, LogOut } from "lucide-react"
import { logout } from "../../services/authService" // Make sure path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    try {
      await logout()
      console.log("Logged out successfully")
      navigate("/") // Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

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
            <button 
              className="bg-white text-purple-700 hover:bg-white/90 px-3 py-2 rounded-md text-sm font-medium"
              onClick={handleLogout}
            >
              Log out
            </button>
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
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`} id="mobile-menu">
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
          <div className="border-t border-white/10 my-2 py-2">
            <button
              className="bg-white text-purple-700 hover:bg-white/90 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
            >
              <div className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                Log out
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
import { ArrowRight, BarChart, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Impause</h1>
        <p className="text-lg text-gray-600">
          Your financial responsibility companion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Finance Wrapped Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 rounded-full p-3">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Weekly, Monthly, Yearly
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Finance Wrapped</h3>
            <p className="text-gray-600 mb-4">
              Get personalized spending summaries in visually engaging formats
            </p>
            <Link
              to="/finance-wrapped"
              className="flex items-center text-purple-600 font-medium hover:text-purple-700"
            >
              View insights <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Impulse Buying Buffer Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-2" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Pause before purchase
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Impulse Buying Buffer</h3>
            <p className="text-gray-600 mb-4">
              Take a moment to reflect before making non-essential purchases
            </p>
            <Link
              to="/impulse-buying"
              className="flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              Start a timer <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Accountability Buddy Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="bg-gradient-to-r from-teal-400 to-orange-400 h-2" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-teal-100 rounded-full p-3">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">
                Better together
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Accountability Buddy</h3>
            <p className="text-gray-600 mb-4">
              Connect with a trusted friend to share financial progress
            </p>
            <Link
              to="/accountability"
              className="flex items-center text-teal-600 font-medium hover:text-teal-700"
            >
              Find a buddy <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Financial Overview Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Financial Overview</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">Monthly Spending</h3>
              <p className="text-3xl font-bold">$1,854.32</p>
              <p className="text-sm text-green-600">↓ 12% from last month</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">Savings Goal</h3>
              <p className="text-3xl font-bold">$4,500 / $10,000</p>
              <p className="text-sm text-gray-600">New Car Fund</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">Impulse Saves</h3>
              <p className="text-3xl font-bold">$328.45</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

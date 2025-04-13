import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Financial infrastructure
                <span className="block text-purple-600">to grow your revenue</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join millions of users who use Impause to manage their finances, control impulse spending,
                and build better financial habits with our innovative tools and features.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Get started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Contact sales
                </Link>
              </div>
              <div className="mt-12">
                <p className="text-sm text-gray-500 mb-4">Trusted by leading companies</p>
                <div className="grid grid-cols-3 gap-8 opacity-50">
                  {/* Replace these divs with actual company logos */}
                  <div className="h-8 bg-gray-400 rounded"></div>
                  <div className="h-8 bg-gray-400 rounded"></div>
                  <div className="h-8 bg-gray-400 rounded"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Phone Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-[2.5rem] blur-xl opacity-30 transform -rotate-6"></div>
              <div className="relative bg-white rounded-[2.5rem] border-8 border-gray-900 shadow-xl transform rotate-6 transition-transform hover:rotate-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-2xl"></div>
                <div className="p-4 h-[600px] overflow-hidden">
                  {/* App Screenshot Content */}
                  <div className="bg-gray-50 rounded-2xl h-full p-4">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">Abstraction Magazine</h3>
                        <p className="text-sm text-gray-500">$19 per month</p>
                      </div>
                      <div className="bg-purple-100 rounded-full p-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Net volume</span>
                          <span className="text-green-500">+32.8%</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">$3,528,198.72</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="h-32 bg-gradient-to-b from-purple-100 rounded-lg"></div>
                        <div className="mt-2 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import { ArrowRight, BarChart, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import UnifiedNavbar from '../../components/Layout/UnifiedNavbar';

const Home = () => {
  return (
    <div className="min-h-screen">
      <UnifiedNavbar />
      <div className="w-full overflow-hidden">
        {/* Hero Section with Gradient Background */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-500 to-orange-400 pt-10 pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Financial responsibility
                  <br />
                  <span className="block mt-1">to improve your future</span>
                </h1>

                <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl">
                  Join thousands of people who use Impause to track spending, avoid impulse purchases,
                  and build a more financially secure life.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/dashboard"
                    className="bg-white text-purple-700 hover:bg-white/90 shadow-lg px-6 py-3 rounded-md font-medium text-lg inline-flex items-center"
                  >
                    Start now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/about"
                    className="bg-transparent text-white border border-white/40 hover:bg-white/10 px-6 py-3 rounded-md font-medium text-lg"
                  >
                    Learn more
                  </Link>
                </div>
              </div>

              {/* Dashboard Preview */}
              <div className="lg:col-span-5 relative hidden lg:block">
                <div className="bg-white rounded-lg shadow-2xl p-4 transform rotate-1">
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Today</h3>
                        <p className="text-gray-700">Financial summary</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">+12% better</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Monthly spending</span>
                          <span className="text-sm font-medium text-gray-800">$1,854.32</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Savings goal</span>
                          <span className="text-sm font-medium text-gray-800">$4,500 / $10,000</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Impulse saves</span>
                          <span className="text-sm font-medium text-gray-800">$328.45 this month</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "78%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Take control of your finances
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-700">
                Our three-pronged approach helps you understand your spending, make better purchasing decisions, and stay accountable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Finance Wrapped Feature */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 rounded-full p-3">
                      <BarChart className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Weekly, Monthly, Yearly
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Finance Wrapped</h3>
                  <p className="text-gray-700 mb-4">
                    Get personalized spending summaries in visually engaging formats. Understand where your money goes and how to improve.
                  </p>
                  <Link
                    to="/finance-wrapped"
                    className="flex items-center text-purple-600 font-medium hover:text-purple-700"
                  >
                    View insights <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Impulse Buying Buffer Feature */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-2" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Pause before purchase
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Impulse Buying Buffer</h3>
                  <p className="text-gray-700 mb-4">
                    Take a moment to reflect before making non-essential purchases. See the real cost in hours worked and impact on goals.
                  </p>
                  <Link
                    to="/impulse-buying"
                    className="flex items-center text-blue-600 font-medium hover:text-blue-700"
                  >
                    Start a timer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Accountability Buddy Feature */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-teal-400 to-orange-400 h-2" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-teal-100 rounded-full p-3">
                      <Users className="h-6 w-6 text-teal-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Better together
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Accountability Buddy</h3>
                  <p className="text-gray-700 mb-4">
                    Connect with a trusted friend to share financial progress. Light social pressure helps maintain good habits.
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
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                What our users say
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-700">
                Join thousands who have improved their financial well-being with Impause.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=11"
                    alt="User"
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Alex Johnson</h4>
                    <p className="text-gray-700">Saved $1,580 in 3 months</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The impulse buffer has completely changed how I shop online. I've avoided so many unnecessary purchases simply by taking time to reflect."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=9"
                    alt="User"
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Taylor Rivera</h4>
                    <p className="text-gray-700">Reached savings goal in 6 months</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The weekly finance wraps made me aware of spending patterns I didn't notice before. Now I'm much more mindful about where my money goes."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/60?img=6"
                    alt="User"
                    className="h-12 w-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Morgan Lee</h4>
                    <p className="text-gray-700">Accountability buddy system user</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Having my best friend as my accountability buddy has been game-changing. We keep each other on track with our financial goals."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-orange-400 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              Ready to take control of your finances?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">
              Join Impause today and start your journey toward financial responsibility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="bg-white text-purple-700 hover:bg-white/90 shadow-lg px-6 py-3 rounded-md font-medium text-lg"
              >
                Sign up for free
              </Link>
              <Link
                to="/signin"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10 px-6 py-3 rounded-md font-medium text-lg"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useState } from 'react';
import { User, DollarSign, Bell, Lock, Shield, HelpCircle, Save } from 'lucide-react';

const Settings = () => {
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Morgan Smith',
    email: 'morgan@example.com',
    currency: 'USD',
    hourlyWage: 25,
    profileImage: 'https://i.pravatar.cc/150?img=5',
    notifications: {
      email: true,
      push: true,
      weeklyReport: true,
      goalReminders: true,
    },
    privacy: {
      shareFinancialSummary: true,
      shareImpulsePurchases: true,
      shareGoalProgress: true,
    },
  });

  const [activeSection, setActiveSection] = useState('profile');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (setting: string) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting as keyof typeof prev.notifications],
      },
    }));
  };

  const handlePrivacyChange = (setting: string) => {
    setUserData((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: !prev.privacy[setting as keyof typeof prev.privacy],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings (would connect to backend in real app)
    alert('Settings saved successfully!');
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-lg text-gray-600">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 mb-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 flex flex-col items-center">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="h-24 w-24 rounded-full mb-4"
              />
              <h2 className="text-lg font-medium">{userData.name}</h2>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
            <div className="border-t border-gray-200">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeSection === 'profile'
                      ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveSection('financial')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeSection === 'financial'
                      ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <DollarSign className="h-5 w-5 mr-3" />
                  Financial Information
                </button>
                <button
                  onClick={() => setActiveSection('notifications')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeSection === 'notifications'
                      ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveSection('privacy')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeSection === 'privacy'
                      ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Lock className="h-5 w-5 mr-3" />
                  Privacy
                </button>
                <button
                  onClick={() => setActiveSection('security')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeSection === 'security'
                      ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  Security
                </button>
                <button
                  onClick={() => setActiveSection('help')}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    activeSection === 'help'
                      ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <HelpCircle className="h-5 w-5 mr-3" />
                  Help & Support
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit}>
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Image URL
                      </label>
                      <input
                        type="text"
                        id="profileImage"
                        name="profileImage"
                        value={userData.profileImage}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Information Section */}
              {activeSection === 'financial' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Financial Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={userData.currency}
                        onChange={(e) => setUserData({ ...userData, currency: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="hourlyWage" className="block text-sm font-medium text-gray-700 mb-1">
                        Hourly Wage (for "hours of work" calculations)
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="hourlyWage"
                          id="hourlyWage"
                          value={userData.hourlyWage}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="0.00"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">/hr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">
                          Receive updates about your financial activity via email
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData.notifications.email}
                            onChange={() => handleNotificationChange('email')}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-500">
                          Receive notifications directly to your device
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData.notifications.push}
                            onChange={() => handleNotificationChange('push')}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-medium">Weekly Finance Report</h3>
                        <p className="text-sm text-gray-500">
                          Receive a summary of your weekly financial activity
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData.notifications.weeklyReport}
                            onChange={() => handleNotificationChange('weeklyReport')}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Goal Reminders</h3>
                        <p className="text-sm text-gray-500">
                          Receive reminders about your savings goals
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData.notifications.goalReminders}
                            onChange={() => handleNotificationChange('goalReminders')}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-medium">Share Financial Summary</h3>
                        <p className="text-sm text-gray-500">
                          Share your weekly and monthly finance wraps with accountability buddies
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData.privacy.shareFinancialSummary}
                            onChange={() => handlePrivacyChange('shareFinancialSummary')}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-medium">Share Impulse Purchases</h3>
                        <p className="text-sm text-gray-500">
                          Allow buddies to see when you bypass an impulse timer
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData.privacy.shareImpulsePurchases}
                            onChange={() => handlePrivacyChange('shareImpulsePurchases')}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Share Goal Progress</h3>
                        <p className="text-sm text-gray-500">
                          Share your savings goal progress with accountability buddies
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={userData.privacy.shareGoalProgress}
                            onChange={() => handlePrivacyChange('shareGoalProgress')}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Help & Support Section */}
              {activeSection === 'help' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Help & Support</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Frequently Asked Questions</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li>
                          <strong>How does the impulse buffer work?</strong>
                          <p className="mt-1">
                            When you want to make a non-essential purchase, start the impulse buffer timer to give yourself time to reflect before committing to the purchase.
                          </p>
                        </li>
                        <li>
                          <strong>What does the accountability buddy system do?</strong>
                          <p className="mt-1">
                            The accountability buddy system lets you connect with friends to share your financial progress and help keep each other responsible.
                          </p>
                        </li>
                        <li>
                          <strong>How is my spending score calculated?</strong>
                          <p className="mt-1">
                            Your spending score is based on how well you stick to your budget, your savings rate, and your impulse buying habits.
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact Support</h3>
                      <p className="text-gray-600 mb-4">
                        Need more help? We're here for you!
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                      >
                        Email Support
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button (for all sections except Help) */}
              {activeSection !== 'help' && (
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import { useState } from 'react';
import { Bell, Check, Plus, Users, X, MessageCircle, ThumbsUp, AlertCircle } from 'lucide-react';

// Mock data for buddies
const mockBuddies = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'pending',
  },
];

// Mock data for accountability notifications
const mockNotifications = [
  {
    id: 1,
    type: 'goal_achieved',
    message: 'Alex reached their monthly savings goal of $500!',
    date: 'Today, 2:35 PM',
    read: false,
  },
  {
    id: 2,
    type: 'impulse_bypass',
    message: 'Alex bypassed an impulse timer for "Designer Shoes - $189.99"',
    date: 'Yesterday, 6:12 PM',
    read: true,
  },
  {
    id: 3,
    type: 'weekly_summary',
    message: 'Your weekly finance wrap is ready to view and share with your buddies',
    date: 'May 7, 2025',
    read: true,
  },
];

const AccountabilityBuddy = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(
    "Hey! I'm using Impause to manage my finances better. Would you be my accountability buddy?"
  );
  const [selectedBuddy, setSelectedBuddy] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('buddies');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invite submission
    alert(`Invitation sent to ${email}`);
    setShowInviteForm(false);
    setEmail('');
  };

  const handleSelectBuddy = (id: number) => {
    setSelectedBuddy(id === selectedBuddy ? null : id);
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Accountability Buddies</h1>
        <p className="text-lg text-gray-600">
          Connect with trusted friends to share financial progress
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('buddies')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'buddies'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-5 w-5 inline-block mr-2" />
              My Buddies
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bell className="h-5 w-5 inline-block mr-2" />
              Notifications
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'buddies' ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Accountability Buddies</h2>
                <button
                  onClick={() => setShowInviteForm(!showInviteForm)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Buddy
                </button>
              </div>

              {showInviteForm && (
                <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium">Invite a Buddy</h3>
                    <button
                      onClick={() => setShowInviteForm(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <form onSubmit={handleInviteSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                        placeholder="friend@example.com"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message (optional)
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowInviteForm(false)}
                        className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Send Invitation
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {mockBuddies.map((buddy) => (
                  <div
                    key={buddy.id}
                    className={`border rounded-lg p-4 ${
                      selectedBuddy === buddy.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectBuddy(buddy.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={buddy.avatar}
                          alt={buddy.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <h3 className="text-md font-medium text-gray-900">{buddy.name}</h3>
                          <p className="text-sm text-gray-500">{buddy.email}</p>
                        </div>
                      </div>
                      <div>
                        {buddy.status === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>

                    {selectedBuddy === buddy.id && (
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <div className="flex space-x-2">
                          <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </button>
                          <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Send Kudos
                          </button>
                          <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <Bell className="h-4 w-4 mr-1" />
                            Alerts
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {mockBuddies.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No buddies yet</h3>
                    <p className="text-gray-500 mb-4">
                      Add an accountability buddy to stay motivated and share progress
                    </p>
                    <button
                      onClick={() => setShowInviteForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Your First Buddy
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <p className="text-gray-500">
                  Notifications from you and your accountability buddies
                </p>
              </div>

              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-4 ${
                      !notification.read ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex">
                      <div
                        className={`p-2 rounded-full mr-3 ${
                          notification.type === 'goal_achieved'
                            ? 'bg-green-100'
                            : notification.type === 'impulse_bypass'
                            ? 'bg-yellow-100'
                            : 'bg-blue-100'
                        }`}
                      >
                        {notification.type === 'goal_achieved' ? (
                          <Check className="h-6 w-6 text-green-600" />
                        ) : notification.type === 'impulse_bypass' ? (
                          <AlertCircle className="h-6 w-6 text-yellow-600" />
                        ) : (
                          <Bell className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {mockNotifications.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications yet</h3>
                    <p className="text-gray-500">
                      Notifications will appear here when you or your buddies have activity
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Accountability Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium">Weekly summary sharing</h3>
                <p className="text-sm text-gray-500">
                  Automatically share your weekly finance wrap with your buddies
                </p>
              </div>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium">Impulse buying notifications</h3>
                <p className="text-sm text-gray-500">
                  Notify your buddies when you bypass an impulse buffer timer
                </p>
              </div>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Goal achievement alerts</h3>
                <p className="text-sm text-gray-500">
                  Notify your buddies when you reach a savings goal
                </p>
              </div>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked={true} />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountabilityBuddy;

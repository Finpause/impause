import { useState, useEffect } from 'react';
import { Clock, DollarSign, Target, Heart, ShoppingCart, XCircle } from 'lucide-react';

// Placeholder purchase data
const currentPurchase = {
  name: 'Wireless Headphones',
  price: 129.99,
  category: 'Electronics',
  hourlyWage: 25, // Assume user's hourly wage
  savingsGoal: {
    name: 'Vacation Fund',
    current: 2800,
    target: 3500,
  },
};

// Reflection prompts
const reflectionPrompts = [
  'Will this purchase bring long-term value?',
  'Is this a need or a want?',
  'Can I delay this purchase for 30 days?',
  'How will I feel about this purchase next week?',
  'Does this align with my financial goals?',
];

const ImpulseBuying = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(15); // Default timer duration in minutes
  const [timeRemaining, setTimeRemaining] = useState(selectedDuration * 60); // in seconds
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  const [bypassConfirmation, setBypassConfirmation] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(reflectionPrompts[0]);

  // Calculate hours of work required
  const hoursOfWork = currentPurchase.price / currentPurchase.hourlyWage;

  // Calculate percentage to savings goal
  const savingsPercentage = Math.round(
    (currentPurchase.savingsGoal.current / currentPurchase.savingsGoal.target) * 100
  );

  useEffect(() => {
    let interval: number | undefined;

    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);

        // Change reflection prompt every 30 seconds
        if (timeRemaining % 30 === 0) {
          const randomIndex = Math.floor(Math.random() * reflectionPrompts.length);
          setCurrentPrompt(reflectionPrompts[randomIndex]);
        }
      }, 1000) as unknown as number;
    } else if (timeRemaining === 0) {
      setTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeRemaining]);

  const startTimer = () => {
    setTimeRemaining(selectedDuration * 60);
    setTimerActive(true);
    setShowPurchaseDetails(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimeRemaining(selectedDuration * 60);
    setShowPurchaseDetails(false);
    setBypassConfirmation(false);
  };

  const bypassTimer = () => {
    setBypassConfirmation(true);
  };

  const confirmBypass = () => {
    // Log the bypass for accountability
    console.log('User bypassed the impulse buffer for:', currentPurchase.name);
    resetTimer();
  };

  const cancelBypass = () => {
    setBypassConfirmation(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Impulse Buying Buffer</h1>
        <p className="text-lg text-gray-600">
          Take a moment to reflect before making a purchase
        </p>
      </div>

      {!timerActive && !showPurchaseDetails && !bypassConfirmation ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">New Purchase Reflection</h2>
            <p className="mb-6 text-gray-600">
              When you're about to make a non-essential purchase, start a reflection timer to help
              you make a more mindful decision.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select reflection duration:
              </label>
              <div className="flex flex-wrap gap-3">
                {[15, 30, 60, 24 * 60].map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => setSelectedDuration(minutes)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedDuration === minutes
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {minutes >= 60
                      ? minutes === 24 * 60
                        ? '24 hours'
                        : `${minutes / 60} hour${minutes > 60 ? 's' : ''}`
                      : `${minutes} min`}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={startTimer}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Clock className="mr-2 h-5 w-5" />
                Start Reflection Timer
              </button>
            </div>
          </div>
        </div>
      ) : showPurchaseDetails && !bypassConfirmation ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Reflection Timer</h2>
              <button
                onClick={resetTimer}
                className="text-gray-400 hover:text-gray-500"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{formatTime(timeRemaining)}</div>
                <div className="text-gray-500">
                  {timerActive ? 'Time remaining before decision' : 'Timer paused'}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mb-8 justify-center">
              {timerActive ? (
                <button
                  onClick={pauseTimer}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Pause
                </button>
              ) : (
                <button
                  onClick={startTimer}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Resume
                </button>
              )}
              <button
                onClick={bypassTimer}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Proceed Anyway
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-medium">Cost in Work Hours</h3>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {hoursOfWork.toFixed(1)} hours
                </p>
                <p className="text-sm text-gray-500">
                  At your hourly rate of ${currentPurchase.hourlyWage}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Target className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-medium">Savings Goal Impact</h3>
                </div>
                <p className="text-2xl font-bold mb-1">
                  {savingsPercentage}% to goal
                </p>
                <p className="text-sm text-gray-500">
                  ${currentPurchase.savingsGoal.current} of ${currentPurchase.savingsGoal.target} for {currentPurchase.savingsGoal.name}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <ShoppingCart className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-lg font-medium">Purchase Details</h3>
                </div>
                <p className="text-2xl font-bold mb-1">
                  ${currentPurchase.price}
                </p>
                <p className="text-sm text-gray-500">
                  {currentPurchase.name} • {currentPurchase.category}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Reflection Prompt</h3>
              <p className="text-xl italic text-blue-900">{currentPrompt}</p>
            </div>
          </div>
        </div>
      ) : bypassConfirmation && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
            <p className="mb-6 text-gray-600">
              You're about to proceed with this purchase without completing the reflection timer.
              This will be logged for your accountability.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <Heart className="h-5 w-5 text-yellow-600 mr-2" />
                <div>
                  <h3 className="text-base font-medium text-yellow-800">
                    Just a gentle reminder
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    The purpose of this buffer is to help you make mindful spending decisions. It's
                    completely okay to proceed if you've thought it through!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={cancelBypass}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Continue Reflecting
              </button>
              <button
                onClick={confirmBypass}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Impulse Saves</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Designer Shoes</div>
                    <div className="text-sm text-gray-500">Fashion</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$189.99</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 8, 2025</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Decided not to buy
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Smart Watch</div>
                    <div className="text-sm text-gray-500">Electronics</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$249.99</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 5, 2025</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Purchased after reflection
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Premium Subscription</div>
                    <div className="text-sm text-gray-500">Digital Services</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">$14.99/mo</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">May 2, 2025</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Decided not to buy
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpulseBuying;

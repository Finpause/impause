import { useState } from 'react';
import { ChevronRight, Download, Share2 } from 'lucide-react';
import { Tab } from '@headlessui/react';

// Placeholder for Chart Component
const SpendingChart = () => (
  <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
    <p className="text-gray-500 text-center">Chart visualization will appear here</p>
  </div>
);

// Placeholder for spending categories
const categories = [
  { name: 'Groceries', amount: 348.52, percentage: 28, color: 'bg-blue-500' },
  { name: 'Dining Out', amount: 216.39, percentage: 18, color: 'bg-purple-500' },
  { name: 'Entertainment', amount: 184.72, percentage: 15, color: 'bg-pink-500' },
  { name: 'Shopping', amount: 172.21, percentage: 14, color: 'bg-yellow-500' },
  { name: 'Transportation', amount: 156.23, percentage: 13, color: 'bg-green-500' },
  { name: 'Other', amount: 147.24, percentage: 12, color: 'bg-gray-500' },
];

// Placeholder for top merchants
const topMerchants = [
  { name: 'Whole Foods', amount: 124.38, category: 'Groceries' },
  { name: 'Amazon', amount: 98.45, category: 'Shopping' },
  { name: 'Netflix', amount: 17.99, category: 'Entertainment' },
  { name: 'Uber', amount: 42.87, category: 'Transportation' },
  { name: 'Starbucks', amount: 34.95, category: 'Dining Out' },
];

const FinanceWrapped = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(1); // Default to Monthly view

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const tabs = [
    { name: 'Weekly', period: 'May 6 - May 12, 2025', total: '$325.87' },
    { name: 'Monthly', period: 'May 2025', total: '$1,854.32' },
    { name: 'Yearly', period: '2025', total: '$21,432.98' },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Finance Wrapped</h1>
        <p className="text-lg text-gray-600">
          Your spending insights visualized
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
          <Tab.List className="flex bg-gray-50 p-1 rounded-t-xl">
            {tabs.map((tab, idx) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'w-full py-3 text-sm font-medium text-center rounded-lg',
                    'focus:outline-none transition-colors',
                    selected
                      ? 'bg-white shadow text-purple-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/[0.5]'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">{tabs[selectedTabIndex].name} Summary</h2>
                <p className="text-gray-500">{tabs[selectedTabIndex].period}</p>
              </div>
              <div className="mt-3 sm:mt-0 flex space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>

            <Tab.Panels>
              {tabs.map((tab, idx) => (
                <Tab.Panel key={idx}>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                        <p className="text-2xl font-bold">{tab.total}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Spending Score</h3>
                        <p className="text-2xl font-bold">86/100</p>
                        <p className="text-sm text-green-600">Great job!</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Top Category</h3>
                        <p className="text-2xl font-bold">Groceries</p>
                        <p className="text-sm text-gray-600">28% of spending</p>
                      </div>
                    </div>
                  </div>

                  {/* Spending Chart */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Spending Trends</h3>
                    <SpendingChart />
                  </div>

                  {/* Category Breakdown */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-4">
                        {categories.map((category) => (
                          <div key={category.name}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{category.name}</span>
                              <span className="text-sm font-medium">${category.amount.toFixed(2)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${category.color} h-2 rounded-full`}
                                style={{ width: `${category.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Merchants */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Merchants</h3>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <ul className="divide-y divide-gray-200">
                        {topMerchants.map((merchant) => (
                          <li key={merchant.name} className="p-4 hover:bg-gray-100">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{merchant.name}</h4>
                                <p className="text-sm text-gray-500">{merchant.category}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">${merchant.amount.toFixed(2)}</span>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
};

export default FinanceWrapped;

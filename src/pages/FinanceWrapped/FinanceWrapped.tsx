"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Share2, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Progress } from "../../components/ui/progress"



// Placeholder data
const weeklyData = {
  period: "May 6 - May 12, 2025",
  total: "$325.87",
  topPurchase: { amount: "$43", merchant: "Sephora", emoji: "💄" },
  impulseCount: 2,
  goalProgress: { name: "New Laptop", progress: 72, emoji: "💻" },
  moneyMood: { type: "Saver", emoji: "🔒" },
  categories: [
    { name: "Food", amount: 128.45, percentage: 39, color: "from-pink-500 to-orange-500" },
    { name: "Transport", amount: 87.32, percentage: 27, color: "from-purple-500 to-indigo-500" },
    { name: "Fun", amount: 65.21, percentage: 20, color: "from-green-500 to-emerald-500" },
    { name: "Other", amount: 44.89, percentage: 14, color: "from-blue-500 to-cyan-500" },
  ],
  // Add subscription data
  subscriptions: {
    count: 3,
    total: 22.98,
    top: [
      { name: "Spotify", amount: 9.99 },
      { name: "Netflix", amount: 8.99 },
      { name: "iCloud", amount: 3.99 }
    ]
  }
}

// Update the monthlyData object to include subscription info
const monthlyData = {
  period: "May 2025",
  total: "$1,854.32",
  categories: [
    { name: "Food", amount: 528.45, percentage: 28, color: "from-pink-500 to-orange-500" },
    { name: "Housing", amount: 687.32, percentage: 37, color: "from-purple-500 to-indigo-500" },
    { name: "Entertainment", amount: 265.21, percentage: 14, color: "from-green-500 to-emerald-500" },
    { name: "Transport", amount: 194.89, percentage: 11, color: "from-blue-500 to-cyan-500" },
    { name: "Other", amount: 178.45, percentage: 10, color: "from-yellow-500 to-amber-500" },
  ],
  topMerchants: [
    { name: "Amazon", amount: 234.56, category: "Shopping" },
    { name: "Uber Eats", amount: 187.32, category: "Food" },
    { name: "Spotify", amount: 14.99, category: "Entertainment" },
  ],
  impulseStats: { paused: 5, saved: 128 },
  savings: 300,
  comparison: { percentage: -12, text: "less than April" },
  score: 82,
  highlight: "You had your first $0 spend day in 2 weeks!",
  // Add subscription data
  subscriptions: {
    count: 8,
    total: 95.92,
    top: [
      { name: "Netflix", amount: 19.99 },
      { name: "Gym", amount: 18.99 },
      { name: "Spotify", amount: 14.99 },
      { name: "Adobe", amount: 12.99 },
      { name: "HBO Max", amount: 9.99 }
    ]
  }
}

// Update the yearlyData object to include subscription info
const yearlyData = {
  period: "2025",
  total: "$21,432.98",
  topCategory: { name: "Eating Out", amount: 2004, emoji: "🍔" },
  favoriteStore: { name: "Target", visits: 24, emoji: "🎯" },
  impulseWins: { count: 43, saved: 1086 },
  savingsGrowth: 120,
  moneyPersona: "The Balanced Boss",
  improvedHabit: { category: "Fast Food", reduction: 31 },
  buddyHighlight: { name: "Alex", count: 47 },
  // Add subscription data
  subscriptions: {
    count: 12,
    total: 1378.68,
    top: [
      { name: "Netflix", amount: 239.88 },
      { name: "Gym", amount: 227.88 },
      { name: "Spotify", amount: 179.88 },
      { name: "Adobe", amount: 155.88 },
      { name: "Disney+", amount: 119.88 }
    ],
    totalPercentage: 6.4
  }
}

// Slide components
// Now let's create the subscription slide component
const SubscriptionSlide = ({ data, timeframe }: { data: any; timeframe: string }) => {
  const gradientClass =
    timeframe === "weekly"
      ? "from-indigo-600 to-cyan-600"
      : timeframe === "monthly"
        ? "from-orange-600 to-amber-600"
        : "from-teal-600 to-green-600"

  const title = timeframe === "yearly" 
    ? "Yearly Subscriptions" 
    : timeframe === "monthly" 
      ? "Monthly Subscriptions" 
      : "Weekly Subscriptions";

  const totalText = timeframe === "yearly"
    ? `${data.subscriptions.totalPercentage}% of yearly spend`
    : `$${data.subscriptions.total.toFixed(2)} this ${timeframe.slice(0, -2)}`;

  return (
    <motion.div
      className={`h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br ${gradientClass} p-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">{title}</h1>
        
        <div className="flex flex-col items-center mb-8">
          <div className="text-6xl sm:text-7xl font-extrabold mb-2">{data.subscriptions.count}</div>
          <p className="text-2xl">Active Subscriptions</p>
          <p className="text-xl mt-2 opacity-80">{totalText}</p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Top Subscriptions</h2>
        <div className="space-y-4">
          {data.subscriptions.top.slice(0, 3).map((sub: any, index: number) => (
            <motion.div
              key={sub.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/10 rounded-lg p-4 flex justify-between items-center"
            >
              <h3 className="text-xl font-semibold">{sub.name}</h3>
              <span className="text-xl font-bold">
                ${timeframe === "yearly" ? sub.amount.toFixed(0) : sub.amount.toFixed(2)}
                {timeframe === "yearly" ? "/yr" : "/mo"}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const SpendingSummarySlide = ({ data, timeframe }: { data: any; timeframe: string }) => {
  const gradientClass =
    timeframe === "weekly"
      ? "from-purple-600 to-pink-600"
      : timeframe === "monthly"
        ? "from-green-600 to-blue-600"
        : "from-pink-600 to-yellow-600"

  return (
    <motion.div
      className={`h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br ${gradientClass} p-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-medium mb-6">
          {timeframe === "weekly" ? "This Week" : timeframe === "monthly" ? "This Month" : "This Year"}
        </h2>
        <h1 className="text-5xl sm:text-7xl font-bold mb-4">You spent</h1>
        <div className="text-6xl sm:text-8xl font-extrabold mb-6">{data.total}</div>
        <p className="text-xl opacity-90">{data.period}</p>
      </motion.div>
    </motion.div>
  )
}

const CategoryBreakdownSlide = ({ data, timeframe }: { data: any; timeframe: string }) => {
  const gradientClass =
    timeframe === "weekly"
      ? "from-blue-600 to-purple-600"
      : timeframe === "monthly"
        ? "from-purple-600 to-pink-600"
        : "from-orange-600 to-red-600"

  return (
    <motion.div
      className={`h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br ${gradientClass} p-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">Your Top Categories</h1>

        <div className="space-y-6">
          {data.categories.map((category: any, index: number) => (
            <motion.div
              key={category.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-xl font-medium">{category.name}</span>
                <span className="text-xl font-medium">${category.amount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${category.color} h-3 rounded-full`}
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

const TopPurchaseSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-pink-600 to-orange-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Biggest Swipe</h1>
      <div className="text-8xl sm:text-9xl font-extrabold mb-6">{data.topPurchase.emoji}</div>
      <div className="text-5xl sm:text-6xl font-bold mb-4">{data.topPurchase.amount}</div>
      <p className="text-2xl opacity-90">at {data.topPurchase.merchant}</p>
    </motion.div>
  </motion.div>
)

const ImpulseSpendSlide = ({ data, timeframe }: { data: any; timeframe: string }) => {
  const content =
    timeframe === "weekly"
      ? { title: "Impulse Spend Count", value: data.impulseCount, text: "times you bypassed the impulse buffer" }
      : timeframe === "monthly"
        ? {
            title: "Impulse Control",
            value: data.impulseStats.paused,
            text: `purchases paused, saved $${data.impulseStats.saved}`,
          }
        : {
            title: "Impulse Spending Wins",
            value: data.impulseWins.count,
            text: `purchases paused = $${data.impulseWins.saved} saved!`,
          }

  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-green-600 to-teal-600 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">{content.title}</h1>
        <div className="text-8xl sm:text-9xl font-extrabold mb-6">{content.value}</div>
        <p className="text-2xl opacity-90">{content.text}</p>
      </motion.div>
    </motion.div>
  )
}

const GoalProgressSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-blue-600 to-violet-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center w-full max-w-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Goal Progress</h1>
      <div className="text-5xl font-bold mb-4">
        {data.goalProgress.name} {data.goalProgress.emoji}
      </div>
      <div className="w-full bg-white/20 rounded-full h-6 mb-4">
        <motion.div
          className="bg-white h-6 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${data.goalProgress.progress}%` }}
          transition={{ delay: 0.5, duration: 1 }}
        ></motion.div>
      </div>
      <p className="text-3xl font-bold">{data.goalProgress.progress}% Complete</p>
    </motion.div>
  </motion.div>
)

const MoneyMoodSlide = ({ data, timeframe }: { data: any; timeframe: string }) => {
  const content =
    timeframe === "weekly"
      ? { title: "Money Mood", value: data.moneyMood.type, emoji: data.moneyMood.emoji }
      : { title: "Your Money Persona", value: data.moneyPersona, emoji: "💰" }

  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-600 to-pink-600 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">{content.title}</h1>
        <div className="text-8xl sm:text-9xl font-extrabold mb-6">{content.emoji}</div>
        <p className="text-4xl sm:text-5xl font-bold">{content.value}</p>
      </motion.div>
    </motion.div>
  )
}

const TopMerchantsSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-yellow-600 to-orange-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="w-full max-w-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center">Your Top Merchants</h1>

      <div className="space-y-6">
        {data.topMerchants.map((merchant: any, index: number) => (
          <motion.div
            key={merchant.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white/10 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{merchant.name}</h3>
                <p className="text-lg opacity-80">{merchant.category}</p>
              </div>
              <span className="text-2xl font-bold">${merchant.amount}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
)

const ComparisonSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-cyan-600 to-blue-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Month-to-Month</h1>
      <div className="text-7xl sm:text-8xl font-extrabold mb-6">{Math.abs(data.comparison.percentage)}%</div>
      <p className="text-3xl font-bold">{data.comparison.percentage < 0 ? "Less" : "More"} than last month</p>
      <div className="mt-8 text-xl opacity-90">
        {data.comparison.percentage < 0 ? "👏 Great job saving!" : "Time to review your budget?"}
      </div>
    </motion.div>
  </motion.div>
)

const HighlightSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-pink-600 to-purple-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Personal Highlight</h1>
      <div className="text-6xl sm:text-7xl font-extrabold mb-6">🎉</div>
      <p className="text-2xl sm:text-3xl font-bold max-w-md mx-auto">{data.highlight}</p>
    </motion.div>
  </motion.div>
)

const FavoriteStoreSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-amber-600 to-yellow-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Favorite Store</h1>
      <div className="text-8xl sm:text-9xl font-extrabold mb-6">{data.favoriteStore.emoji}</div>
      <p className="text-3xl font-bold mb-4">{data.favoriteStore.name}</p>
      <p className="text-2xl opacity-90">You visited {data.favoriteStore.visits} times</p>
    </motion.div>
  </motion.div>
)

const ImprovedHabitSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-green-600 to-emerald-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Most Improved Habit</h1>
      <div className="text-7xl sm:text-8xl font-extrabold mb-6">{data.improvedHabit.reduction}%</div>
      <p className="text-2xl sm:text-3xl font-bold">Reduction in {data.improvedHabit.category} spending</p>
      <p className="mt-6 text-xl opacity-90">Compared to last year</p>
    </motion.div>
  </motion.div>
)

const BuddyHighlightSlide = ({ data }: { data: any }) => (
  <motion.div
    className="h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-blue-600 to-indigo-600 p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-8">Finance Buddy</h1>
      <div className="text-8xl sm:text-9xl font-extrabold mb-6">👯</div>
      <p className="text-2xl sm:text-3xl font-bold max-w-md mx-auto">
        You and {data.buddyHighlight.name} kept each other in check {data.buddyHighlight.count} times 💪
      </p>
    </motion.div>
  </motion.div>
)

// Main component
export default function FinanceWrapped() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">("monthly")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [data, setData] = useState(monthlyData)

  // Define slides for each timeframe
  // Update the weeklySlides array to include the subscription slide
  const weeklySlides = [
    { component: SpendingSummarySlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: CategoryBreakdownSlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: TopPurchaseSlide, props: { data: weeklyData } },
    { component: ImpulseSpendSlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: SubscriptionSlide, props: { data: weeklyData, timeframe: "weekly" } }, // Add here
    { component: GoalProgressSlide, props: { data: weeklyData } },
    { component: MoneyMoodSlide, props: { data: weeklyData, timeframe: "weekly" } },
  ]

  // Update the monthlySlides array to include the subscription slide
  const monthlySlides = [
    { component: SpendingSummarySlide, props: { data: monthlyData, timeframe: "monthly" } },
    { component: CategoryBreakdownSlide, props: { data: monthlyData, timeframe: "monthly" } },
    { component: TopMerchantsSlide, props: { data: monthlyData } },
    { component: ImpulseSpendSlide, props: { data: monthlyData, timeframe: "monthly" } },
    { component: SubscriptionSlide, props: { data: monthlyData, timeframe: "monthly" } }, // Add here
    { component: ComparisonSlide, props: { data: monthlyData } },
    { component: HighlightSlide, props: { data: monthlyData } },
  ]

  // Update the yearlySlides array to include the subscription slide
  const yearlySlides = [
    { component: SpendingSummarySlide, props: { data: yearlyData, timeframe: "yearly" } },
    { component: CategoryBreakdownSlide, props: { data: monthlyData, timeframe: "yearly" } },
    { component: SubscriptionSlide, props: { data: yearlyData, timeframe: "yearly" } }, // Add here
    { component: FavoriteStoreSlide, props: { data: yearlyData } },
    { component: ImpulseSpendSlide, props: { data: yearlyData, timeframe: "yearly" } },
    { component: ImprovedHabitSlide, props: { data: yearlyData } },
    { component: MoneyMoodSlide, props: { data: yearlyData, timeframe: "yearly" } },
    { component: BuddyHighlightSlide, props: { data: yearlyData } },
  ]
  // Get current slides based on timeframe
  const getSlides = () => {
    switch (timeframe) {
      case "weekly":
        return weeklySlides
      case "monthly":
        return monthlySlides
      case "yearly":
        return yearlySlides
      default:
        return monthlySlides
    }
  }

  const slides = getSlides()

  // Update data when timeframe changes
  useEffect(() => {
    switch (timeframe) {
      case "weekly":
        setData(weeklyData)
        break
      case "monthly":
        setData(monthlyData)
        break
      case "yearly":
        setData(yearlyData)
        break
    }
    setCurrentSlide(0)
  }, [timeframe])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      nextSlide()
    } else if (e.key === "ArrowLeft") {
      prevSlide()
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSlide])

  // Render the current slide
  const CurrentSlideComponent = slides[currentSlide].component
  const currentSlideProps = slides[currentSlide].props

  if (!isOpen) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Finance Wrapped</h1>
          <p className="text-lg text-gray-600">Your spending insights visualized</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => {
              setTimeframe("weekly")
              setIsOpen(true)
            }}
          >
            <div className="p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Weekly Wrapped</h2>
              <p className="opacity-80 mb-4">Quick wins & habits</p>
              <p className="text-3xl font-bold">{weeklyData.total}</p>
              <p className="opacity-80 mt-1">{weeklyData.period}</p>
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-green-600 to-blue-600 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => {
              setTimeframe("monthly")
              setIsOpen(true)
            }}
          >
            <div className="p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Monthly Wrapped</h2>
              <p className="opacity-80 mb-4">Trends & highlights</p>
              <p className="text-3xl font-bold">{monthlyData.total}</p>
              <p className="opacity-80 mt-1">{monthlyData.period}</p>
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-pink-600 to-yellow-600 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => {
              setTimeframe("yearly")
              setIsOpen(true)
            }}
          >
            <div className="p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">Yearly Wrapped</h2>
              <p className="opacity-80 mb-4">Reflection & identity</p>
              <p className="text-3xl font-bold">{yearlyData.total}</p>
              <p className="opacity-80 mt-1">{yearlyData.period}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 text-white">
          <div className="bg-white/10 px-4 py-2 rounded-full">
            <span className="font-medium">{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Wrapped</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="w-48 sm:w-64">
            <Progress value={(currentSlide / (slides.length - 1)) * 100} className="h-2 bg-white/20" />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <CurrentSlideComponent key={currentSlide} {...currentSlideProps} />
        </AnimatePresence>
      </div>
    </div>
  )
}

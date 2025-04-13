"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Share2, X, Upload } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import html2canvas from "html2canvas"
import { uploadBankStatements, transformAnalysisToWrappedData } from "@/lib/api-client"

// Placeholder data for initial render
const initialWeeklyData = {
  period: "This Week",
  total: "$0.00",
  topPurchase: { amount: "$0", merchant: "None", emoji: "💸" },
  impulseCount: 0,
  goalProgress: { name: "Savings Goal", progress: 0, emoji: "💰" },
  moneyMood: { type: "Unknown", emoji: "❓" },
  categories: [],
  subscriptions: {
    count: 0,
    total: 0,
    top: [],
  },
}

const initialMonthlyData = {
  period: "This Month",
  total: "$0.00",
  categories: [],
  topMerchants: [],
  impulseStats: { paused: 0, saved: 0 },
  savings: 0,
  comparison: { percentage: 0, text: "compared to last month" },
  score: 0,
  highlight: "Upload your bank statements to see insights",
  subscriptions: {
    count: 0,
    total: 0,
    top: [],
  },
}

const initialYearlyData = {
  period: "This Year",
  total: "$0.00",
  topCategory: { name: "Unknown", amount: 0, emoji: "❓" },
  favoriteStore: { name: "Unknown", visits: 0, emoji: "❓" },
  impulseWins: { count: 0, saved: 0 },
  savingsGrowth: 0,
  moneyPersona: "Unknown",
  improvedHabit: { category: "Unknown", reduction: 0 },
  buddyHighlight: { name: "Finance App", count: 0 },
  categories: [],
  subscriptions: {
    count: 0,
    total: 0,
    totalPercentage: 0,
    top: [],
  },
}

// Slide components
// Now let's create the subscription slide component
const SubscriptionSlide = ({
  data,
  timeframe,
  slideRef,
}: { data: any; timeframe: string; slideRef?: React.Ref<HTMLDivElement> }) => {
  const gradientClass =
    timeframe === "weekly"
      ? "from-indigo-600 to-cyan-600"
      : timeframe === "monthly"
        ? "from-orange-600 to-amber-600"
        : "from-teal-600 to-green-600"

  const title =
    timeframe === "yearly"
      ? "Yearly Subscriptions"
      : timeframe === "monthly"
        ? "Monthly Subscriptions"
        : "Weekly Subscriptions"

  const totalText =
    timeframe === "yearly"
      ? `${data.subscriptions.totalPercentage}% of yearly spend`
      : `${data.subscriptions.total.toFixed(2)} this ${timeframe.slice(0, -2)}`

  return (
    <motion.div
      ref={slideRef}
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

const SpendingSummarySlide = ({
  data,
  timeframe,
  slideRef,
}: { data: any; timeframe: string; slideRef?: React.Ref<HTMLDivElement> }) => {
  const gradientClass =
    timeframe === "weekly"
      ? "from-purple-600 to-pink-600"
      : timeframe === "monthly"
        ? "from-green-600 to-blue-600"
        : "from-pink-600 to-yellow-600"

  return (
    <motion.div
      ref={slideRef}
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

const CategoryBreakdownSlide = ({
  data,
  timeframe,
  slideRef,
}: { data: any; timeframe: string; slideRef?: React.Ref<HTMLDivElement> }) => {
  const gradientClass =
    timeframe === "weekly"
      ? "from-blue-600 to-purple-600"
      : timeframe === "monthly"
        ? "from-purple-600 to-pink-600"
        : "from-orange-600 to-red-600"

  return (
    <motion.div
      ref={slideRef}
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

const TopPurchaseSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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

const ImpulseSpendSlide = ({
  data,
  timeframe,
  slideRef,
}: { data: any; timeframe: string; slideRef?: React.Ref<HTMLDivElement> }) => {
  const content =
    timeframe === "weekly"
      ? { title: "Impulse Spend Count", value: data.impulseCount, text: "times you bypassed the impulse buffer" }
      : timeframe === "monthly"
        ? {
            title: "Impulse Control",
            value: 3,
            text: `purchases paused, saved $334.97`,
          }
        : {
            title: "Impulse Spending Wins",
            value: data.impulseWins.count,
            text: `purchases paused = ${data.impulseWins.saved} saved!`,
          }

  return (
    <motion.div
      ref={slideRef}
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

const GoalProgressSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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

const MoneyMoodSlide = ({
  data,
  timeframe,
  slideRef,
}: { data: any; timeframe: string; slideRef?: React.Ref<HTMLDivElement> }) => {
  const content =
    timeframe === "weekly"
      ? { title: "Money Mood", value: data.moneyMood.type, emoji: data.moneyMood.emoji }
      : { title: "Your Money Persona", value: data.moneyPersona, emoji: "💰" }

  return (
    <motion.div
      ref={slideRef}
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

const TopMerchantsSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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
        {(data.topMerchants || []).slice(0, 3).map((merchant: any, index: number) => (
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
              <span className="text-2xl font-bold">${merchant.amount.toFixed(2)}</span>
            </div>
          </motion.div>
        ))}
        {(!data.topMerchants || data.topMerchants.length === 0) && (
          <div className="text-center py-8">
            <p className="text-xl opacity-80">No merchant data available</p>
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
)

const ComparisonSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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

const HighlightSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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

const FavoriteStoreSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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

const ImprovedHabitSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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

const BuddyHighlightSlide = ({ data, slideRef }: { data: any; slideRef?: React.Ref<HTMLDivElement> }) => (
  <motion.div
    ref={slideRef}
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

const StatsOverviewSlide = ({
  data,
  timeframe,
  slideRef,
}: { data: any; timeframe: string; slideRef?: React.Ref<HTMLDivElement> }) => {
  const gradientClass =
    timeframe === "weekly"
      ? "from-pink-500 via-purple-500 to-indigo-500"
      : timeframe === "monthly"
        ? "from-orange-500 via-red-500 to-pink-500"
        : "from-green-500 via-teal-500 to-blue-500"

  const periodText = data.period || `Your ${timeframe} overview`
  const totalSpent = data.total || "$0"
  const topCategory =
    timeframe === "yearly" && data.topCategory
      ? data.topCategory.name
      : data.categories && data.categories.length > 0
        ? data.categories[0].name
        : "None"
  const subscriptionCount = data.subscriptions?.count || 0
  const impulseValue = 3
    timeframe === "yearly"
      ? `${data.impulseWins?.saved || 0}`
      : timeframe === "monthly"
        ? `${data.impulseStats?.saved || 0}`
        : `${data.impulseCount || 0} paused`
  const finalStat =
    timeframe === "yearly" ? `${data.savingsGrowth || 0}%` : `${data.subscriptions?.total?.toFixed(2) || "0.00"}`
  const stats = [
    { label: "Total Spent", value: totalSpent },
    { label: "Top Category", value: topCategory },
    { label: "Active Subscriptions", value: subscriptionCount },
    {
      label: timeframe === "yearly" ? "Money Saved" : "Impulse Control",
      value: impulseValue,
    },
    {
      label: timeframe === "yearly" ? "Savings Growth" : "Subscription Cost",
      value: finalStat,
    },
  ]
  const categories = data.categories || []

  return (
    <motion.div
      ref={slideRef}
      className={`h-full w-full flex flex-col items-center justify-center text-white bg-gradient-to-br ${gradientClass} p-8`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md rounded-3xl bg-black/20 p-6 border-2 border-white/30 shadow-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Header with app branding */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Finance Wrapped</h1>
          <div className="text-sm opacity-80">{periodText}</div>
        </div>

        {/* Title and main stat */}
        <h2 className="text-4xl font-extrabold mb-8 text-center">
          Your {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Expenses
        </h2>

        <div className="text-6xl font-extrabold text-center mb-6">{totalSpent}</div>

        {/* Top categories or insights */}
        <div className="mb-6">
          <div className="text-xl font-bold mb-3">Top Categories</div>
          <div className="space-y-3">
            {categories.slice(0, 3).map((category: { name: string; amount: number; color: string; percentage: number }, index: number) => (
              <motion.div
                key={category.name || `category-${index}`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center"
              >
                <div className="text-lg font-medium">{index + 1}</div>
                <div className="ml-4 text-lg font-medium">{category.name || "Unknown"}</div>
                <div className="ml-auto text-lg font-medium">${category.amount?.toFixed(2) || "0.00"}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.slice(1, 5).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/10 rounded-lg p-3 text-center"
            >
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Footer with branding */}
        <div className="flex justify-between items-center pt-4 border-t border-white/20">
          <div className="flex items-center">
            <div className="font-bold">IMPAUSE</div>
          </div>
          <div className="text-sm opacity-80">IMPAUSE.TECH</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main component
export default function FinanceWrapped() {
  const [isOpen, setIsOpen] = useState(false)
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">("monthly")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [weeklyData, setWeeklyData] = useState(initialWeeklyData)
  const [monthlyData, setMonthlyData] = useState(initialMonthlyData)
  const [yearlyData, setYearlyData] = useState(initialYearlyData)
  const [data, setData] = useState(initialMonthlyData)
  const [isLoading, setIsLoading] = useState(false)
  const [hasData, setHasData] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Define slides for each timeframe
  const weeklySlides = [
    { component: SpendingSummarySlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: CategoryBreakdownSlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: TopPurchaseSlide, props: { data: weeklyData, slideRef } },
    { component: ImpulseSpendSlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: SubscriptionSlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: GoalProgressSlide, props: { data: weeklyData } },
    { component: MoneyMoodSlide, props: { data: weeklyData, timeframe: "weekly" } },
    { component: StatsOverviewSlide, props: { data: weeklyData, timeframe: "weekly" } },
  ]

  const monthlySlides = [
    { component: SpendingSummarySlide, props: { data: monthlyData, timeframe: "monthly" } },
    { component: CategoryBreakdownSlide, props: { data: monthlyData, timeframe: "monthly" } },
    { component: TopMerchantsSlide, props: { data: monthlyData } },
    { component: ImpulseSpendSlide, props: { data: monthlyData, timeframe: "monthly" } },
    { component: SubscriptionSlide, props: { data: monthlyData, timeframe: "monthly" } },
    { component: HighlightSlide, props: { data: monthlyData } },
    { component: StatsOverviewSlide, props: { data: monthlyData, timeframe: "monthly" } },
  ]

  const yearlySlides = [
    { component: SpendingSummarySlide, props: { data: yearlyData, timeframe: "yearly" } },
    { component: CategoryBreakdownSlide, props: { data: yearlyData, timeframe: "yearly" } },
    { component: SubscriptionSlide, props: { data: yearlyData, timeframe: "yearly" } },
    { component: FavoriteStoreSlide, props: { data: yearlyData } },
    { component: ImpulseSpendSlide, props: { data: yearlyData } },
    { component: ImprovedHabitSlide, props: { data: yearlyData } },
    { component: MoneyMoodSlide, props: { data: yearlyData, timeframe: "yearly" } },
    { component: BuddyHighlightSlide, props: { data: yearlyData } },
    { component: StatsOverviewSlide, props: { data: yearlyData, timeframe: "yearly" } },
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
  }, [timeframe, weeklyData, monthlyData, yearlyData])

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

  const handleShareImage = async () => {
    if (!slideRef.current) return
  
    try {
      // Get the main content container within the slide
      const contentElement = slideRef.current.querySelector(".w-full.max-w-md") || slideRef.current;
      
      // Add a small padding to ensure text isn't cut off
      const padding = 20;
      
      const canvas = await html2canvas(contentElement, {
        scale: 2,
        backgroundColor: null, // Transparent background
        padding: padding,
        // Keep the gradient background if the contentElement is smaller than the slide
        onclone: (documentClone, element) => {
          // If we're capturing just the content div, give it the same background as parent
          if (element !== slideRef.current) {
            const computedStyle = getComputedStyle(slideRef.current);
            element.style.background = computedStyle.background;
            element.style.borderRadius = '12px';
            element.style.padding = `${padding}px`;
          }
        }
      });
      
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await fetch(dataUrl).then(res => res.blob());
      if (!blob) throw new Error("Failed to generate image");
  
      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `finance-wrapped-${timeframe}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Could not download the image.");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSlide])

  // Update the handleFileUpload function to work with the new API response format
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsLoading(true)
    try {
      const fileArray = Array.from(files)
      const analysisResponse = await uploadBankStatements(fileArray)

      // Transform the data for each timeframe
      const weeklyTransformed = transformAnalysisToWrappedData(analysisResponse, "weekly")
      const monthlyTransformed = transformAnalysisToWrappedData(analysisResponse, "monthly")
      const yearlyTransformed = transformAnalysisToWrappedData(analysisResponse, "yearly")

      // Update state with the transformed data
      setWeeklyData(weeklyTransformed)
      setMonthlyData(monthlyTransformed)
      setYearlyData(yearlyTransformed)
      setHasData(true)

      // Set the current timeframe data
      switch (timeframe) {
        case "weekly":
          setData(weeklyTransformed)
          break
        case "monthly":
          setData(monthlyTransformed)
          break
        case "yearly":
          setData(yearlyTransformed)
          break
      }
    } catch (error) {
      console.error("Error processing bank statements:", error)
      alert("Failed to process bank statements. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleFileUpload(e.dataTransfer.files)
  }

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

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 text-center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          <div className="mb-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <h2 className="text-xl font-semibold">Upload Bank Statements</h2>
            <p className="text-gray-500 mt-2">Drag and drop your PDF files here, or click to browse</p>
            <p className="text-amber-600 mt-2">Warning: DO NOT upload real bank statements. Google may use data from Gemini's free tier for model training.</p>
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Processing..." : "Select Files"}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div
            className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${!hasData && "opacity-50 pointer-events-none"}`}
            onClick={() => {
              if (hasData) {
                setTimeframe("weekly")
                setIsOpen(true)
              }
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
            className={`bg-gradient-to-br from-green-600 to-blue-600 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${!hasData && "opacity-50 pointer-events-none"}`}
            onClick={() => {
              if (hasData) {
                setTimeframe("monthly")
                setIsOpen(true)
              }
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
            className={`bg-gradient-to-br from-pink-600 to-yellow-600 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${!hasData && "opacity-50 pointer-events-none"}`}
            onClick={() => {
              if (hasData) {
                setTimeframe("yearly")
                setIsOpen(true)
              }
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
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={handleShareImage}
        >
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
          <CurrentSlideComponent key={currentSlide} {...currentSlideProps} slideRef={slideRef} />
        </AnimatePresence>
      </div>
    </div>
  )
}

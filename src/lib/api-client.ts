// API client for communicating with the Gemini backend

export interface FinanceAnalysis {
  period: string
  totalSpend: number
  formattedTotal: string
  currency: string
  transactions: Transaction[]
  categoryBreakdown: Category[]
  subscriptions: Subscriptions
  // Remove topMerchants as it's not in the Gemini response
  // Add optional fields that might be derived during transformation
  topMerchants?: Merchant[]
  topPurchase?: TopPurchase
  highlight?: string
  savings?: number
  topCategory?: TopCategory
  favoriteStore?: FavoriteStore
}

// New interface for the combined response from Gemini
export interface GeminiResponse {
  weekly: FinanceAnalysis
  monthly: FinanceAnalysis
  yearly: FinanceAnalysis
}

export interface Transaction {
  date: string
  description: string
  amount: number
  category: string
  emoji: string
}

export interface Category {
  name: string
  amount: number
  percentage: number
  color?: string
  emoji: string
}

export interface Merchant {
  name: string
  amount: number
  category: string
  visits: number
  emoji: string
}

export interface Subscriptions {
  count: number
  total: number
  totalPercentage?: number
  list: Subscription[]
}

export interface Subscription {
  name: string
  amount: number
  emoji: string
}

export interface TopPurchase {
  amount: number
  merchant: string
  emoji: string
  description?: string
  date: string
}

export interface TopCategory {
  name: string
  amount: number
  emoji: string
}

export interface FavoriteStore {
  name: string
  visits: number
  emoji: string
}

// Function to upload files to the Gemini backend
export async function uploadBankStatements(files: File[]): Promise<GeminiResponse> {
  const formData = new FormData()

  // Append all files to the form data
  files.forEach((file) => {
    formData.append("files", file)
  })

  try {
    const response = await fetch("https://ai.impause.tech/api/gemini", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to analyze statements")
    }

    const data = await response.json()

    // Validate the response structure
    if (!data.success || !data.result || !data.result.weekly || !data.result.monthly || !data.result.yearly) {
      throw new Error("Invalid response format from the API")
    }

    return data.result as GeminiResponse
  } catch (error) {
    console.error("Error uploading bank statements:", error)
    throw error
  }
}

// Update the transformAnalysisToWrappedData function to handle the new response structure
export function transformAnalysisToWrappedData(
  analysisResponse: GeminiResponse,
  timeframe: "weekly" | "monthly" | "yearly",
) {
  // Get the appropriate analysis based on timeframe
  const analysis = analysisResponse[timeframe]

  // Assign colors to categories if they don't have them
  const colorPalettes = {
    weekly: [
      "from-pink-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-green-500 to-emerald-500",
      "from-blue-500 to-cyan-500",
      "from-yellow-500 to-amber-500",
    ],
    monthly: [
      "from-orange-500 to-red-500",
      "from-blue-500 to-indigo-500",
      "from-green-500 to-teal-500",
      "from-purple-500 to-pink-500",
      "from-yellow-500 to-amber-500",
    ],
    yearly: [
      "from-teal-500 to-green-500",
      "from-pink-500 to-purple-500",
      "from-blue-500 to-cyan-500",
      "from-orange-500 to-amber-500",
      "from-indigo-500 to-violet-500",
    ],
  }

  // Assign colors to categories
  const categoriesWithColors = analysis.categoryBreakdown.map((category, index) => ({
    ...category,
    color: category.color || colorPalettes[timeframe][index % colorPalettes[timeframe].length],
  }))

  // Generate topMerchants from transactions if not provided
  // This is needed because the Gemini API doesn't return topMerchants directly
  const topMerchants = generateTopMerchants(analysis.transactions)

  // Generate topPurchase from transactions if not provided
  const topPurchase = generateTopPurchase(analysis.transactions)

  // Transform subscriptions data
  const subscriptions = {
    count: analysis.subscriptions.count,
    total: analysis.subscriptions.total,
    totalPercentage: (analysis.subscriptions.total / analysis.totalSpend) * 100, // Calculate percentage
    top: analysis.subscriptions.list.map((sub) => ({
      name: sub.name,
      amount: sub.amount,
      emoji: sub.emoji,
    })),
  }

  // Create the base data structure
  const wrappedData = {
    period: analysis.period,
    total: analysis.formattedTotal,
    categories: categoriesWithColors,
    subscriptions,
    topMerchants,
    topPurchase,
  }

  // Add timeframe-specific data
  if (timeframe === "weekly") {
    return {
      ...wrappedData,
      topPurchase: topPurchase || { amount: "$0", merchant: "None", emoji: "💸" },
      impulseCount: 0, // This data isn't available from the API
      goalProgress: { name: "Savings Goal", progress: 0, emoji: "💰" }, // Placeholder
      moneyMood: { type: "Balanced", emoji: "⚖️" }, // Placeholder
    }
  } else if (timeframe === "monthly") {
    return {
      ...wrappedData,
      topMerchants,
      impulseStats: { paused: 0, saved: 0 }, // Placeholder for impulse stats
      savings: 0,
      comparison: { percentage: 0, text: "compared to last month" }, // Placeholder
      score: 0, // Placeholder
      highlight: "Your financial insights are ready!", // Default highlight
    }
  } else {
    // Generate topCategory and favoriteStore from transactions
    const topCategory = generateTopCategory(analysis.categoryBreakdown)
    const favoriteStore = generateFavoriteStore(analysis.transactions)

    return {
      ...wrappedData,
      topCategory: topCategory || { name: "Unknown", amount: 0, emoji: "❓" },
      favoriteStore: favoriteStore || { name: "Unknown", visits: 0, emoji: "❓" },
      impulseWins: { count: 0, saved: 0 }, // Placeholder
      savingsGrowth: 0, // Placeholder
      moneyPersona: "The Balanced Spender", // Placeholder
      improvedHabit: { category: "Overall Spending", reduction: 0 }, // Placeholder
      buddyHighlight: { name: "Finance App", count: 0 }, // Placeholder
    }
  }
}

// Helper function to generate top merchants from transactions
function generateTopMerchants(transactions: Transaction[]): Merchant[] {
  // Create a map to track merchants
  const merchantMap = new Map<string, { amount: number; category: string; visits: number; emoji: string }>()

  // Process transactions to identify merchants
  transactions.forEach((transaction) => {
    // Skip positive transactions (deposits)
    if (transaction.amount >= 0) return

    // Extract merchant name from description
    const merchantName = extractMerchantName(transaction.description)

    if (merchantMap.has(merchantName)) {
      const merchant = merchantMap.get(merchantName)!
      merchant.amount += Math.abs(transaction.amount)
      merchant.visits += 1
    } else {
      merchantMap.set(merchantName, {
        amount: Math.abs(transaction.amount),
        category: transaction.category,
        visits: 1,
        emoji: transaction.emoji,
      })
    }
  })

  // Convert map to array and sort by amount
  return Array.from(merchantMap.entries())
    .map(([name, data]) => ({
      name,
      amount: data.amount,
      category: data.category,
      visits: data.visits,
      emoji: data.emoji,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5) // Return top 5 merchants
}

// Helper function to extract merchant name from transaction description
function extractMerchantName(description: string): string {
  // Simple extraction - in a real app, this would be more sophisticated
  const words = description.split(" ")
  return words.length > 1 ? words.slice(0, 2).join(" ") : description
}

// Helper function to generate top purchase from transactions
function generateTopPurchase(transactions: Transaction[]): TopPurchase | undefined {
  // Find transaction with largest negative amount (biggest expense)
  const topTransaction = [...transactions].filter((t) => t.amount < 0).sort((a, b) => a.amount - b.amount)[0]

  if (!topTransaction) return undefined

  return {
    amount: Math.abs(topTransaction.amount),
    merchant: extractMerchantName(topTransaction.description),
    emoji: topTransaction.emoji,
    description: topTransaction.description,
    date: topTransaction.date,
  }
}

// Helper function to generate top category from category breakdown
function generateTopCategory(categories: Category[]): TopCategory | undefined {
  if (categories.length === 0) return undefined

  const topCategory = categories.sort((a, b) => b.amount - a.amount)[0]

  return {
    name: topCategory.name,
    amount: topCategory.amount,
    emoji: topCategory.emoji,
  }
}

// Helper function to generate favorite store from transactions
function generateFavoriteStore(transactions: Transaction[]): FavoriteStore | undefined {
  // Count occurrences of each merchant
  const merchantCounts = new Map<string, { count: number; emoji: string }>()

  transactions.forEach((transaction) => {
    const merchantName = extractMerchantName(transaction.description)

    if (merchantCounts.has(merchantName)) {
      merchantCounts.get(merchantName)!.count += 1
    } else {
      merchantCounts.set(merchantName, { count: 1, emoji: transaction.emoji })
    }
  })

  // Find merchant with highest visit count
  let favoriteStore: { name: string; visits: number; emoji: string } | undefined

  merchantCounts.forEach((data, merchant) => {
    if (!favoriteStore || data.count > favoriteStore.visits) {
      favoriteStore = {
        name: merchant,
        visits: data.count,
        emoji: data.emoji,
      }
    }
  })

  return favoriteStore
}

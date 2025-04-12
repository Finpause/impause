// API client for communicating with the Gemini backend

export interface FinanceAnalysis {
    period: string
    totalSpend: number
    formattedTotal: string
    currency: string
    transactions: Transaction[]
    categoryBreakdown: Category[]
    topMerchants: Merchant[]
    subscriptions: Subscriptions
    topPurchase?: TopPurchase
    highlight?: string
    savings?: number
    topCategory?: TopCategory
    favoriteStore?: FavoriteStore
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
export async function uploadBankStatements(files: File[]): Promise<FinanceAnalysis> {
    const formData = new FormData()

    // Append all files to the form data
    files.forEach((file) => {
        formData.append("files", file)
    })

    try {
        const response = await fetch("http://localhost:8787/api/gemini", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to analyze statements")
        }

        const data = await response.json()
        return data.result
    } catch (error) {
        console.error("Error uploading bank statements:", error)
        throw error
    }
}

// Function to transform the raw analysis data into the format expected by the Finance Wrapped component
export function transformAnalysisToWrappedData(analysis: FinanceAnalysis, timeframe: "weekly" | "monthly" | "yearly") {
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

    // Transform subscriptions data
    const subscriptions = {
        count: analysis.subscriptions.count,
        total: analysis.subscriptions.total,
        totalPercentage: analysis.subscriptions.totalPercentage,
        top: analysis.subscriptions.list.map((sub) => ({
            name: sub.name,
            amount: sub.amount,
        })),
    }

    // Create the base data structure
    const wrappedData = {
        period: analysis.period,
        total: analysis.formattedTotal,
        categories: categoriesWithColors,
        subscriptions,
    }

    // Add timeframe-specific data
    if (timeframe === "weekly") {
        return {
            ...wrappedData,
            topPurchase: analysis.topPurchase
                ? {
                    amount: analysis.currency + analysis.topPurchase.amount,
                    merchant: analysis.topPurchase.merchant,
                    emoji: analysis.topPurchase.emoji,
                }
                : undefined,
            impulseCount: 0, // This data isn't available from the API
            goalProgress: { name: "Savings Goal", progress: 0, emoji: "💰" }, // Placeholder
            moneyMood: { type: "Balanced", emoji: "⚖️" }, // Placeholder
        }
    } else if (timeframe === "monthly") {
        return {
            ...wrappedData,
            topMerchants: analysis.topMerchants.map((merchant) => ({
                name: merchant.name,
                amount: merchant.amount,
                category: merchant.category,
            })),
            impulseStats: { paused: 0, saved: analysis.savings || 0 }, // Placeholder for impulse stats
            savings: analysis.savings || 0,
            comparison: { percentage: 0, text: "compared to last month" }, // Placeholder
            score: 0, // Placeholder
            highlight: analysis.highlight || "No highlight available",
        }
    } else {
        return {
            ...wrappedData,
            topCategory: analysis.topCategory
                ? {
                    name: analysis.topCategory.name,
                    amount: analysis.topCategory.amount,
                    emoji: analysis.topCategory.emoji,
                }
                : undefined,
            favoriteStore: analysis.favoriteStore,
            impulseWins: { count: 0, saved: analysis.savings || 0 }, // Placeholder
            savingsGrowth: 0, // Placeholder
            moneyPersona: "The Balanced Spender", // Placeholder
            improvedHabit: { category: "Overall Spending", reduction: 0 }, // Placeholder
            buddyHighlight: { name: "Finance App", count: 0 }, // Placeholder
        }
    }
}

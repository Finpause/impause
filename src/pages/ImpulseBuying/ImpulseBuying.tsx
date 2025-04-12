import { useState, useEffect } from "react"
import { Clock, DollarSign, Target, Heart, ShoppingCart, XCircle, Brain } from "lucide-react"
import PurchaseForm from "./PurchaseForm.tsx"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Types
export interface Purchase {
  name: string
  price: number
  category: string
  reason: string
  needScore: number // 1-10 rating of how much they need it
  hourlyWage?: number
  savingsGoal?: {
    name: string
    current: number
    target: number
  }
}

export interface ReflectionResult {
  purchase: Purchase
  date: Date
  outcome: "purchased" | "declined"
  reflectionNotes?: string
}

const ImpulseBuying = () => {
  const [timerActive, setTimerActive] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(15) // Default timer duration in minutes
  const [timeRemaining, setTimeRemaining] = useState(selectedDuration * 60) // in seconds
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false)
  const [bypassConfirmation, setBypassConfirmation] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [reflectionPrompts, setReflectionPrompts] = useState<string[]>([])
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null)
  const [showForm, setShowForm] = useState(true)
  const [reflectionHistory, setReflectionHistory] = useState<ReflectionResult[]>([
    {
      purchase: {
        name: "Designer Shoes",
        price: 189.99,
        category: "Fashion",
        reason: "Want to look stylish",
        needScore: 4,
      },
      date: new Date(2025, 4, 8),
      outcome: "declined",
    },
    {
      purchase: {
        name: "Smart Watch",
        price: 249.99,
        category: "Electronics",
        reason: "Track fitness and notifications",
        needScore: 7,
      },
      date: new Date(2025, 4, 5),
      outcome: "purchased",
    },
    {
      purchase: {
        name: "Premium Subscription",
        price: 14.99,
        category: "Digital Services",
        reason: "Access to exclusive content",
        needScore: 3,
      },
      date: new Date(2025, 4, 2),
      outcome: "declined",
    },
  ])
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false)

  useEffect(() => {
    let interval: number | undefined

    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1)

        // Change reflection prompt every 30 seconds
        if (timeRemaining % 30 === 0 && reflectionPrompts.length > 0) {
          const randomIndex = Math.floor(Math.random() * reflectionPrompts.length)
          setCurrentPrompt(reflectionPrompts[randomIndex])
        }
      }, 1000) as unknown as number
    } else if (timeRemaining === 0) {
      setTimerActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, timeRemaining, reflectionPrompts])

  const handlePurchaseSubmit = async (purchase: Purchase) => {
    setCurrentPurchase(purchase)
    setShowForm(false)

    // Generate AI reflection prompts based on purchase details
    setIsGeneratingPrompts(true)
    try {
      const generatedPrompts = await generateReflectionPrompts(purchase)
      setReflectionPrompts(generatedPrompts)
      setCurrentPrompt(generatedPrompts[0])
    } catch (error) {
      console.error("Failed to generate reflection prompts:", error)
      // Fallback to default prompts
      const defaultPrompts = [
        "Will this purchase bring long-term value?",
        "Is this a need or a want?",
        "Can I delay this purchase for 30 days?",
        "How will I feel about this purchase next week?",
        "Does this align with my financial goals?",
      ]
      setReflectionPrompts(defaultPrompts)
      setCurrentPrompt(defaultPrompts[0])
    } finally {
      setIsGeneratingPrompts(false)
    }
  }

  const startTimer = () => {
    setTimeRemaining(selectedDuration * 60)
    setTimerActive(true)
    setShowPurchaseDetails(true)
  }

  const pauseTimer = () => {
    setTimerActive(false)
  }

  const resetTimer = () => {
    setTimerActive(false)
    setTimeRemaining(selectedDuration * 60)
    setShowPurchaseDetails(false)
    setBypassConfirmation(false)
    setShowForm(true)
    setCurrentPurchase(null)
  }

  const bypassTimer = () => {
    setBypassConfirmation(true)
  }

  const confirmBypass = () => {
    if (currentPurchase) {
      // Add to reflection history
      setReflectionHistory((prev) => [
        {
          purchase: currentPurchase,
          date: new Date(),
          outcome: "purchased",
        },
        ...prev,
      ])
    }
    resetTimer()
  }

  const declinePurchase = () => {
    if (currentPurchase) {
      // Add to reflection history
      setReflectionHistory((prev) => [
        {
          purchase: currentPurchase,
          date: new Date(),
          outcome: "declined",
        },
        ...prev,
      ])
    }
    resetTimer()
  }

  const cancelBypass = () => {
    setBypassConfirmation(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Calculate hours of work required if hourly wage is provided
  const hoursOfWork = currentPurchase?.hourlyWage ? currentPurchase.price / currentPurchase.hourlyWage : null

  // Calculate percentage to savings goal if provided
  const savingsPercentage = currentPurchase?.savingsGoal
    ? Math.round((currentPurchase.savingsGoal.current / currentPurchase.savingsGoal.target) * 100)
    : null

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Impulse Buying Buffer</h1>
        <p className="text-lg text-gray-600">Take a moment to reflect before making a purchase</p>
      </div>

      {showForm && <PurchaseForm onSubmit={handlePurchaseSubmit} />}

      {!timerActive && !showPurchaseDetails && !bypassConfirmation && !showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>New Purchase Reflection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-gray-600">
              When you're about to make a non-essential purchase, start a reflection timer to help you make a more
              mindful decision.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select reflection duration:</label>
              <div className="flex flex-wrap gap-3">
                {[15, 30, 60, 24 * 60].map((minutes) => (
                  <Button
                    key={minutes}
                    onClick={() => setSelectedDuration(minutes)}
                    variant={selectedDuration === minutes ? "default" : "outline"}
                    className="text-sm"
                  >
                    {minutes >= 60
                      ? minutes === 24 * 60
                        ? "24 hours"
                        : `${minutes / 60} hour${minutes > 60 ? "s" : ""}`
                      : `${minutes} min`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Button onClick={startTimer} className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Start Reflection Timer
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : showPurchaseDetails && !bypassConfirmation && !showForm ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Reflection Timer</h2>
              <Button variant="ghost" size="icon" onClick={resetTimer} className="text-gray-400 hover:text-gray-500">
                <XCircle className="h-6 w-6" />
              </Button>
            </div>

            <div className="mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{formatTime(timeRemaining)}</div>
                <div className="text-gray-500">{timerActive ? "Time remaining before decision" : "Timer paused"}</div>
              </div>
            </div>

            <div className="flex space-x-3 mb-8 justify-center">
              {timerActive ? (
                <Button variant="outline" onClick={pauseTimer}>
                  Pause
                </Button>
              ) : (
                <Button variant="outline" onClick={startTimer}>
                  Resume
                </Button>
              )}
              <Button onClick={bypassTimer}>Proceed Anyway</Button>
              <Button variant="destructive" onClick={declinePurchase}>
                Decline Purchase
              </Button>
            </div>

            {currentPurchase && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <ShoppingCart className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-medium">Purchase Details</h3>
                  </div>
                  <p className="text-2xl font-bold mb-1">${currentPurchase.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    {currentPurchase.name} • {currentPurchase.category}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-medium">Reason:</span> {currentPurchase.reason}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Need score:</span> {currentPurchase.needScore}/10
                  </p>
                </div>

                {hoursOfWork !== null && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="text-lg font-medium">Cost in Work Hours</h3>
                    </div>
                    <p className="text-2xl font-bold mb-1">{hoursOfWork.toFixed(1)} hours</p>
                    <p className="text-sm text-gray-500">At your hourly rate of ${currentPurchase.hourlyWage}</p>
                  </div>
                )}

                {savingsPercentage !== null && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Target className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="text-lg font-medium">Savings Goal Impact</h3>
                    </div>
                    <p className="text-2xl font-bold mb-1">{savingsPercentage}% to goal</p>
                    <p className="text-sm text-gray-500">
                      ${currentPurchase.savingsGoal?.current} of ${currentPurchase.savingsGoal?.target} for{" "}
                      {currentPurchase.savingsGoal?.name}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Brain className="h-5 w-5 text-blue-800 mr-2" />
                <h3 className="text-lg font-medium text-blue-800">Reflection Prompt</h3>
              </div>
              {isGeneratingPrompts ? (
                <p className="text-blue-700">Generating personalized prompts...</p>
              ) : (
                <p className="text-xl italic text-blue-900">{currentPrompt}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : bypassConfirmation && !showForm ? (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
            <p className="mb-6 text-gray-600">
              You're about to proceed with this purchase without completing the reflection timer. This will be logged
              for your accountability.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <Heart className="h-5 w-5 text-yellow-600 mr-2" />
                <div>
                  <h3 className="text-base font-medium text-yellow-800">Just a gentle reminder</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    The purpose of this buffer is to help you make mindful spending decisions. It's completely okay to
                    proceed if you've thought it through!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={cancelBypass} className="flex-1">
                Continue Reflecting
              </Button>
              <Button onClick={confirmBypass} className="flex-1">
                Confirm Purchase
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Impulse Saves</h2>
        <Card>
          <CardContent className="p-6">
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
                  {reflectionHistory.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.purchase.name}</div>
                        <div className="text-sm text-gray-500">{item.purchase.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.purchase.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(item.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.outcome === "declined" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Decided not to buy</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            Purchased after reflection
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ImpulseBuying

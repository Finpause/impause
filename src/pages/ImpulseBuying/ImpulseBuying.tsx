import {useEffect, useRef, useState} from "react"
import {Brain, Clock, DollarSign, Heart, ShoppingCart, Target} from "lucide-react"
import PurchaseForm from "./PurchaseForm"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {generateReflectionPrompts} from "@/lib/api-client"

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

// Sample reflection history
const sampleHistory: ReflectionResult[] = [
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
]

// Default reflection prompts
const defaultPrompts = [
  "Will this purchase bring long-term value?",
  "Is this a need or a want?",
  "Can I delay this purchase for 30 days?",
  "How will I feel about this purchase next week?",
  "Does this align with my financial goals?",
]

const ImpulseBuying = () => {
  // Form and purchase state
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null)
  const [reflectionHistory, setReflectionHistory] = useState<ReflectionResult[]>(sampleHistory)

  // Timer state
  const [timerActive, setTimerActive] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(15) // Default timer duration in minutes
  const [customDuration, setCustomDuration] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(selectedDuration * 60) // in seconds
  const timerRef = useRef<number | null>(null)

  // Reflection prompts state
  const [reflectionPrompts, setReflectionPrompts] = useState<string[]>(defaultPrompts)
  const [currentPrompt, setCurrentPrompt] = useState(defaultPrompts[0])
  const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false)

  // UI state
  const [bypassConfirmation, setBypassConfirmation] = useState(false)

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Handle timer state changes
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (timerActive && timeRemaining > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as number)
            timerRef.current = null
            setTimerActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timerActive])

  // Change reflection prompt periodically
  useEffect(() => {
    if (timerActive && reflectionPrompts.length > 0 && timeRemaining % 30 === 0 && timeRemaining > 0) {
      const randomIndex = Math.floor(Math.random() * reflectionPrompts.length)
      setCurrentPrompt(reflectionPrompts[randomIndex])
    }
  }, [timeRemaining, timerActive, reflectionPrompts])

  const handlePurchaseSubmit = async (purchase: Purchase) => {
    setCurrentPurchase(purchase)

    // Generate AI reflection prompts based on purchase details
    setIsGeneratingPrompts(true)
    try {
      const generatedPrompts = await generateReflectionPrompts(purchase)
      setReflectionPrompts(generatedPrompts)
      setCurrentPrompt(generatedPrompts[0])
    } catch (error) {
      console.error("Failed to generate reflection prompts:", error)
      // Fallback to default prompts
      setReflectionPrompts(defaultPrompts)
      setCurrentPrompt(defaultPrompts[0])
    } finally {
      setIsGeneratingPrompts(false)
    }
  }

  const startTimer = () => {
    if (!currentPurchase) {
      alert("Please fill out the purchase details first")
      return
    }

    // Stop any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Set the duration based on custom input or selected preset
    let duration = selectedDuration
    if (customDuration) {
      const customMinutes = Number.parseInt(customDuration)
      if (!isNaN(customMinutes) && customMinutes > 0) {
        duration = customMinutes
      }
    }

    setTimeRemaining(duration * 60)
    setTimerActive(true)
  }

  const pauseTimer = () => {
    setTimerActive(false)
  }

  const resumeTimer = () => {
    if (timeRemaining > 0) {
      setTimerActive(true)
    }
  }

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setTimerActive(false)
    setTimeRemaining(selectedDuration * 60)
    setBypassConfirmation(false)
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Purchase Form Section */}
        <div>
          <PurchaseForm onSubmit={handlePurchaseSubmit} />
        </div>

        {/* Timer Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Reflection Timer</CardTitle>
            </CardHeader>
            <CardContent>
              {!bypassConfirmation ? (
                <>
                  <div className="mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{formatTime(timeRemaining)}</div>
                      <div className="text-gray-500">
                        {timerActive ? "Time remaining before decision" : "Set timer and start reflection"}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select reflection duration:</label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {[15, 30, 60, 24 * 60].map((minutes) => (
                        <Button
                          key={minutes}
                          onClick={() => {
                            setSelectedDuration(minutes)
                            setCustomDuration("")
                          }}
                          variant={selectedDuration === minutes && !customDuration ? "default" : "outline"}
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

                    <div className="flex items-end gap-3">
                      <div className="w-full">
                        <Label htmlFor="custom-time" className="text-sm font-medium text-gray-700">
                          Custom time (minutes):
                        </Label>
                        <Input
                          id="custom-time"
                          type="number"
                          min="1"
                          placeholder="Enter custom time"
                          value={customDuration}
                          onChange={(e) => {
                            setCustomDuration(e.target.value)
                            if (e.target.value) {
                              setSelectedDuration(0) // Clear selected preset
                            }
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {timerActive && currentPurchase && (
                    <>
                      <div className="grid grid-cols-1 gap-4 mb-6">
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
                            <p className="text-sm text-gray-500">
                              At your hourly rate of ${currentPurchase.hourlyWage}
                            </p>
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

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mb-6">
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

                      <div className="flex space-x-3 justify-center">
                        {timerActive ? (
                          <Button variant="outline" onClick={pauseTimer}>
                            Pause
                          </Button>
                        ) : (
                          <Button variant="outline" onClick={resumeTimer}>
                            Resume
                          </Button>
                        )}
                        <Button onClick={bypassTimer}>Proceed Anyway</Button>
                        <Button variant="destructive" onClick={declinePurchase}>
                          Decline Purchase
                        </Button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
                  <p className="mb-6 text-gray-600">
                    You're about to proceed with this purchase without completing the reflection timer. This will be
                    logged for your accountability.
                  </p>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <Heart className="h-5 w-5 text-yellow-600 mr-2" />
                      <div>
                        <h3 className="text-base font-medium text-yellow-800">Just a gentle reminder</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          The purpose of this buffer is to help you make mindful spending decisions. It's completely
                          okay to proceed if you've thought it through!
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
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Start Reflection Process Button - Moved to bottom */}
      <div className="mb-12">
        <Button
          onClick={startTimer}
          disabled={!currentPurchase || timerActive}
          size="lg"
          className="w-full py-6 text-lg"
        >
          <Clock className="mr-2 h-6 w-6" />
          Start Reflection Process
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Recent Impulse Saves</h2>
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
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

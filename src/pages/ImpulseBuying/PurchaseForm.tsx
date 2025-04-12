import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { Purchase } from "./ImpulseBuying"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  name: z.string().min(2, { message: "Item name must be at least 2 characters." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  category: z.string().min(1, { message: "Please select a category." }),
  reason: z.string().min(5, { message: "Please provide a reason for this purchase." }),
  needScore: z.number().min(1).max(10),
  includeFinancialDetails: z.boolean().default(false),
  hourlyWage: z.coerce.number().positive().optional(),
  savingsGoalName: z.string().optional(),
  savingsGoalCurrent: z.coerce.number().nonnegative().optional(),
  savingsGoalTarget: z.coerce.number().positive().optional(),
})

interface PurchaseFormProps {
  onSubmit: (purchase: Purchase) => void
}

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Books & Entertainment",
  "Food & Dining",
  "Travel",
  "Digital Services",
  "Other",
]

const PurchaseForm = ({ onSubmit }: PurchaseFormProps) => {
  const [showFinancialDetails, setShowFinancialDetails] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      reason: "",
      needScore: 5,
      includeFinancialDetails: false,
      hourlyWage: undefined,
      savingsGoalName: "",
      savingsGoalCurrent: undefined,
      savingsGoalTarget: undefined,
    },
  })

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    const purchase: Purchase = {
      name: values.name,
      price: values.price,
      category: values.category,
      reason: values.reason,
      needScore: values.needScore,
    }

    if (values.includeFinancialDetails && values.hourlyWage) {
      purchase.hourlyWage = values.hourlyWage
    }

    if (
      values.includeFinancialDetails &&
      values.savingsGoalName &&
      values.savingsGoalCurrent !== undefined &&
      values.savingsGoalTarget !== undefined
    ) {
      purchase.savingsGoal = {
        name: values.savingsGoalName,
        current: values.savingsGoalCurrent,
        target: values.savingsGoalTarget,
      }
    }

    onSubmit(purchase)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Purchase Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Wireless Headphones" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="129.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want to buy this?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain why you want to purchase this item..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="needScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How much do you need this? (1-10)</FormLabel>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Want (1)</span>
                      <span>Need (10)</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <div className="text-center font-medium">{field.value}</div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="includeFinancialDetails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Financial Context</FormLabel>
                    <FormDescription>Add financial details to see how this purchase impacts your goals</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked)
                        setShowFinancialDetails(checked)
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {showFinancialDetails && (
              <div className="space-y-6 border-t pt-6">
                <FormField
                  control={form.control}
                  name="hourlyWage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Hourly Wage ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="25.00"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>This helps calculate how many work hours this purchase costs</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Savings Goal (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="savingsGoalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Goal Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Vacation Fund" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="savingsGoalCurrent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Amount ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="2800"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="savingsGoalTarget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Amount ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="3500"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            <CardFooter className="px-0 pt-4">
              <Button type="submit" className="w-full">
                Apply Details
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PurchaseForm

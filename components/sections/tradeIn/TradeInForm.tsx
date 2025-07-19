'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function TradeInForm() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Get Your Trade-In Estimate
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below to receive a comprehensive evaluation of
                your vehicle's trade-in value.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vehicle Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Vehicle Information</h3>

                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 25 }, (_, i) => 2024 - i).map(
                          (year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="make">Make</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ford">Ford</SelectItem>
                        <SelectItem value="chevrolet">Chevrolet</SelectItem>
                        <SelectItem value="ram">Ram</SelectItem>
                        <SelectItem value="gmc">GMC</SelectItem>
                        <SelectItem value="freightliner">
                          Freightliner
                        </SelectItem>
                        <SelectItem value="peterbilt">Peterbilt</SelectItem>
                        <SelectItem value="kenworth">Kenworth</SelectItem>
                        <SelectItem value="isuzu">Isuzu</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="Enter model" />
                  </div>

                  <div>
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="Enter current mileage"
                    />
                  </div>

                  <div>
                    <Label htmlFor="condition">Overall Condition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="vin">VIN (Optional)</Label>
                    <Input
                      id="vin"
                      placeholder="Enter VIN for more accurate estimate"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Information</h3>

                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>

                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredContact">
                      Preferred Contact Method
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="How would you like to be contacted?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="text">Text Message</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timeframe">Purchase Timeframe</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="When are you looking to purchase?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediately</SelectItem>
                        <SelectItem value="30days">Within 30 days</SelectItem>
                        <SelectItem value="60days">Within 60 days</SelectItem>
                        <SelectItem value="90days">Within 90 days</SelectItem>
                        <SelectItem value="exploring">
                          Just exploring
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Tell us about any recent repairs, modifications, or other details that might affect your vehicle's value..."
                  rows={4}
                />
              </div>

              <Button size="lg" className="w-full">
                Get My Trade-In Estimate
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to be contacted by our sales
                team. We respect your privacy and will never share your
                information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

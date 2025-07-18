import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Shield, Wrench, Star } from 'lucide-react'

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose TruckMax?
          </h2>
          <p className="text-lg text-gray-600">
            We're committed to providing the best truck buying experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Quality Guarantee</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Every truck undergoes a comprehensive 150-point inspection
                before sale.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Wrench className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Expert Service</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Our certified technicians provide ongoing maintenance and repair
                services.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>5-Star Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Rated #1 truck dealer in the region with over 1,000 satisfied
                customers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

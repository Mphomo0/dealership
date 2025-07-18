import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Truck,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Shield,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Mock data - in a real app, this would come from a database
const trucks = [
  {
    id: 1,
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    price: 45000,
    mileage: 12000,
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
    condition: 'Used',
    features: [
      '4WD',
      'Crew Cab',
      'V8 Engine',
      'Leather Seats',
      'Navigation',
      'Backup Camera',
    ],
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '5.0L V8',
    drivetrain: '4WD',
    exteriorColor: 'Oxford White',
    interiorColor: 'Black Leather',
    vin: '1FTFW1E50NFA12345',
    stockNumber: 'T2023001',
    mpg: '17 city / 24 highway',
    description:
      'This 2023 Ford F-150 is in excellent condition with low mileage. Features include a powerful 5.0L V8 engine, 4WD capability, and premium leather interior. Perfect for both work and family use.',
    keyFeatures: [
      '5.0L V8 Engine',
      '10-Speed Automatic Transmission',
      '4WD System',
      'Crew Cab Configuration',
      'Leather-Appointed Seats',
      'SYNC 4 Infotainment System',
      'Pro Trailer Backup Assist',
      'Blind Spot Information System',
      'Adaptive Cruise Control',
      'LED Headlights',
    ],
    warranty: 'Remaining factory warranty until 2026 or 60,000 miles',
  },
  {
    id: 2,
    make: 'Chevrolet',
    model: 'Silverado 1500',
    year: 2024,
    price: 52000,
    mileage: 5000,
    images: [
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
      '/placeholder.svg?height=400&width=600',
    ],
    condition: 'Used',
    features: [
      '4WD',
      'Extended Cab',
      'Turbo Diesel',
      'Tow Package',
      'Heated Seats',
    ],
    fuelType: 'Diesel',
    transmission: 'Automatic',
    engine: '3.0L Turbo Diesel',
    drivetrain: '4WD',
    exteriorColor: 'Summit White',
    interiorColor: 'Jet Black Cloth',
    vin: '1GCUYDED5PZ123456',
    stockNumber: 'T2024002',
    mpg: '23 city / 33 highway',
    description:
      'Nearly new 2024 Chevrolet Silverado 1500 with efficient turbo diesel engine. Excellent fuel economy and towing capability.',
    keyFeatures: [
      '3.0L Duramax Turbo Diesel',
      '10-Speed Automatic',
      '4WD System',
      'Max Trailering Package',
      'Heated Front Seats',
      'Chevrolet Infotainment 3',
      'Teen Driver Technology',
      'Rear Vision Camera',
      'StabiliTrak Electronic Stability Control',
    ],
    warranty: 'Full factory warranty until 2027 or 100,000 miles',
  },
]

interface PageProps {
  params: {
    id: string
  }
}

export default function TruckDetailPage({ params }: PageProps) {
  const truck = trucks.find((t) => t.id === Number.parseInt(params.id))

  if (!truck) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/inventory">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Image
                    src={truck.images[0] || '/placeholder.svg'}
                    alt={`${truck.year} ${truck.make} ${truck.model}`}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                </div>
                {truck.images.slice(1, 3).map((image, index) => (
                  <Image
                    key={index}
                    src={image || '/placeholder.svg'}
                    alt={`${truck.year} ${truck.make} ${truck.model} - Image ${
                      index + 2
                    }`}
                    width={300}
                    height={200}
                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">
                      {truck.year} {truck.make} {truck.model}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Stock #{truck.stockNumber}
                    </p>
                  </div>
                  <Badge className="bg-blue-600">{truck.condition}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="font-semibold">{truck.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Mileage</p>
                      <p className="font-semibold">
                        {truck.mileage.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Fuel Type</p>
                      <p className="font-semibold">{truck.fuelType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Transmission</p>
                      <p className="font-semibold">{truck.transmission}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {truck.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Engine</p>
                    <p className="font-semibold">{truck.engine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drivetrain</p>
                    <p className="font-semibold">{truck.drivetrain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exterior Color</p>
                    <p className="font-semibold">{truck.exteriorColor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interior Color</p>
                    <p className="font-semibold">{truck.interiorColor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">MPG</p>
                    <p className="font-semibold">{truck.mpg}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">VIN</p>
                    <p className="font-semibold text-xs">{truck.vin}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {truck.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price & Contact */}
            <Card className="mb-6 sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${truck.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600">
                    {truck.mileage.toLocaleString()} miles
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call (555) 123-4567
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Dealer
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Schedule Test Drive
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Financing
                </Button>
              </CardContent>
            </Card>

            {/* Warranty */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Warranty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{truck.warranty}</p>
              </CardContent>
            </Card>

            {/* Dealer Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Dealer Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    5.0 (247 reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Highly rated dealer with excellent customer service and
                  quality vehicles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

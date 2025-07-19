import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const featuredTrucks = [
  {
    id: 1,
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    price: 45000,
    mileage: 12000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Crew Cab', 'V8 Engine'],
  },
  {
    id: 2,
    make: 'Chevrolet',
    model: 'Silverado 1500',
    year: 2024,
    price: 52000,
    mileage: 5000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Extended Cab', 'Turbo Diesel'],
  },
  {
    id: 3,
    make: 'Ram',
    model: '1500',
    year: 2023,
    price: 48000,
    mileage: 8000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Quad Cab', 'HEMI V8'],
  },
]

export default function Featured() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Trucks
          </h2>
          <p className="text-lg text-gray-600">
            Check out our most popular vehicles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrucks.map((truck) => (
            <Card
              key={truck.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  src={truck.image || '/placeholder.svg'}
                  alt={`${truck.year} ${truck.make} ${truck.model}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-amber-600">
                  {truck.condition}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {truck.year} {truck.make} {truck.model}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-yellow-600">
                    R{truck.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600">
                    {truck.mileage.toLocaleString()} km
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {truck.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/inventory/${truck.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/inventory">View All Inventory</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

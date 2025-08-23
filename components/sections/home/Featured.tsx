'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Gauge } from 'lucide-react'

interface Image {
  fileId: string
  url: string
}

interface Truck {
  id: string
  name: string
  make: string
  model: string
  year: number
  vatPrice: number
  mileage: number
  fuelType: string
  condition: string
  transmission: string
  images: Image[]
  description: string
  slug: string
}

export default function Featured() {
  const [trucks, setTrucks] = useState<Truck[]>([])

  const fetchTrucks = async () => {
    try {
      const res = await fetch('/api/vehicles/featured')
      const data = await res.json()
      setTrucks(data)
    } catch (error) {
      console.error('Error fetching trucks:', error)
    }
  }

  useEffect(() => {
    fetchTrucks()
  }, [])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600">
            Check out our most popular vehicles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trucks.map((truck) => (
            <Card
              key={truck.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative -top-6">
                <Image
                  src={truck.images[0].url}
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
                <h3 className="text-xl font-bold mb-2 -mt-10">
                  {truck.year} {truck.make} {truck.model}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-yellow-600">
                    R{truck.vatPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-600 flex flex-row">
                    <span className="p-1">
                      <Gauge size={18} />
                    </span>
                    &nbsp;
                    <span>{truck.mileage.toLocaleString()} km</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>{truck.condition}</Badge>
                  <Badge>{truck.fuelType}</Badge>
                  <Badge>{truck.transmission}</Badge>
                </div>
                <Button asChild className="w-full -mb-[20px]">
                  <Link href={`/inventory/${truck.slug}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="hover:bg-black hover:text-white"
          >
            <Link href="/inventory">View All Inventory</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

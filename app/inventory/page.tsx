'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const trucks = [
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
    fuelType: 'Gasoline',
    transmission: 'Automatic',
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
    fuelType: 'Diesel',
    transmission: 'Automatic',
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
    fuelType: 'Gasoline',
    transmission: 'Automatic',
  },
  {
    id: 4,
    make: 'Ford',
    model: 'F-250 Super Duty',
    year: 2022,
    price: 58000,
    mileage: 15000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Crew Cab', 'Power Stroke Diesel'],
    fuelType: 'Diesel',
    transmission: 'Automatic',
  },
  {
    id: 5,
    make: 'GMC',
    model: 'Sierra 1500',
    year: 2023,
    price: 49000,
    mileage: 9000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Double Cab', 'V8 Engine'],
    fuelType: 'Gasoline',
    transmission: 'Automatic',
  },
  {
    id: 6,
    make: 'Toyota',
    model: 'Tacoma',
    year: 2023,
    price: 38000,
    mileage: 7000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Double Cab', 'V6 Engine'],
    fuelType: 'Gasoline',
    transmission: 'Manual',
  },
  {
    id: 7,
    make: 'Nissan',
    model: 'Titan',
    year: 2022,
    price: 42000,
    mileage: 18000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Crew Cab', 'V8 Engine'],
    fuelType: 'Gasoline',
    transmission: 'Automatic',
  },
  {
    id: 8,
    make: 'Chevrolet',
    model: 'Colorado',
    year: 2024,
    price: 35000,
    mileage: 3000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Extended Cab', 'Turbo 4-Cylinder'],
    fuelType: 'Gasoline',
    transmission: 'Automatic',
  },
  {
    id: 9,
    make: 'Ram',
    model: '2500',
    year: 2022,
    price: 62000,
    mileage: 22000,
    image: '/images/ford.jpg',
    condition: 'Used',
    features: ['4WD', 'Crew Cab', 'Cummins Diesel'],
    fuelType: 'Diesel',
    transmission: 'Manual',
  },
]

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [makeFilter, setMakeFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [fuelFilter, setFuelFilter] = useState('all')

  const filteredTrucks = trucks.filter((truck) => {
    const matchesSearch =
      truck.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.model.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMake =
      makeFilter === 'all' ||
      truck.make.toLowerCase() === makeFilter.toLowerCase()
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'under40k' && truck.price < 40000) ||
      (priceFilter === '40k-50k' &&
        truck.price >= 40000 &&
        truck.price < 50000) ||
      (priceFilter === 'over50k' && truck.price >= 50000)
    const matchesFuel =
      fuelFilter === 'all' ||
      truck.fuelType.toLowerCase() === fuelFilter.toLowerCase()

    return matchesSearch && matchesMake && matchesPrice && matchesFuel
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Our Inventory
          </h1>
          <p className="text-lg text-gray-600">
            Browse our selection of quality pre-owned trucks
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Filter Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={makeFilter} onValueChange={setMakeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Makes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="chevrolet">Chevrolet</SelectItem>
                <SelectItem value="ram">Ram</SelectItem>
                <SelectItem value="gmc">GMC</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under40k">Under $40,000</SelectItem>
                <SelectItem value="40k-50k">$40,000 - $50,000</SelectItem>
                <SelectItem value="over50k">Over $50,000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={fuelFilter} onValueChange={setFuelFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Fuel Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fuel Types</SelectItem>
                <SelectItem value="gasoline">Gasoline</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTrucks.length} of {trucks.length} trucks
          </p>
        </div>

        {/* Truck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrucks.map((truck) => (
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
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
                  <div>Fuel: {truck.fuelType}</div>
                  <div>Trans: {truck.transmission}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {truck.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                  {truck.features.length > 2 && (
                    <Badge variant="outline">
                      +{truck.features.length - 2} more
                    </Badge>
                  )}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/inventory/${truck.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTrucks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No trucks found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setMakeFilter('all')
                setPriceFilter('all')
                setFuelFilter('all')
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

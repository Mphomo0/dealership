'use client'

import { useState, useEffect } from 'react'
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
import { Search, Filter, Gauge } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Pagination } from '@/components/global/Pagination'

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

interface FilterOptions {
  makes: string[]
  models: string[]
  years: number[]
  priceRanges: {
    min: number
    max: number
  }
}

export default function AllVehiclesFilter() {
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    limit: 6,
    totalPages: 1,
    total: 0,
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [makeFilter, setMakeFilter] = useState('all')
  const [modelFilter, setModelFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')

  // Dynamic filter options
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    makes: [],
    models: [],
    years: [],
    priceRanges: { min: 0, max: 0 },
  })

  const fetchTrucks = async (page = 1, limit = 6, filters = {}) => {
    try {
      setLoading(true)

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      })

      const res = await fetch(`/api/vehicles?${params.toString()}`)
      if (!res.ok) {
        throw new Error('Failed to fetch trucks')
      }

      const data = await res.json()
      console.log('Fetched trucks:', data)

      setTrucks(data.vehicles)
      //   setLoading(false)
      setPaginationMeta(data.meta)

      // Set dynamic filter options if provided
      if (data.filterOptions) {
        setFilterOptions(data.filterOptions)
      }

      setError(null)
    } catch (error) {
      console.error('Error fetching trucks:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch filter options separately
  const fetchFilterOptions = async () => {
    try {
      const res = await fetch('/api/vehicles/filters')
      if (!res.ok) {
        throw new Error('Failed to fetch filter options')
      }

      const data = await res.json()
      setFilterOptions(data)
    } catch (error) {
      console.error('Filter options fetch error:', error)
    }
  }

  useEffect(() => {
    fetchTrucks()
    fetchFilterOptions()
  }, [])

  // Handle filter changes
  useEffect(() => {
    const filters: Record<string, string> = {}

    if (searchTerm) {
      filters.search = searchTerm
    }
    if (makeFilter !== 'all') {
      filters.make = makeFilter
    }
    if (modelFilter !== 'all') {
      filters.model = modelFilter
    }
    if (yearFilter !== 'all') {
      filters.year = yearFilter
    }
    if (priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-')
      if (min) filters.minPrice = min
      if (max && max !== 'plus') filters.maxPrice = max
    }

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      fetchTrucks(1, paginationMeta.limit, filters)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, makeFilter, modelFilter, priceFilter, yearFilter])

  // Reset model filter when make changes
  useEffect(() => {
    if (makeFilter !== 'all') {
      setModelFilter('all')
    }
  }, [makeFilter])

  // Get models for selected make
  const getModelsForMake = () => {
    if (makeFilter === 'all') return []

    return trucks
      .filter((truck) => truck.make.toLowerCase() === makeFilter.toLowerCase())
      .map((truck) => truck.model)
      .filter((model, index, array) => array.indexOf(model) === index)
      .sort()
  }

  // Generate dynamic price ranges
  const getPriceRanges = () => {
    if (
      filterOptions.priceRanges.min === 0 &&
      filterOptions.priceRanges.max === 0
    ) {
      return []
    }

    const min = filterOptions.priceRanges.min
    const max = filterOptions.priceRanges.max
    const range = max - min
    const step = Math.ceil(range / 5 / 10000) * 10000 // Round to nearest 10k

    const ranges = []
    for (let i = min; i < max; i += step) {
      const rangeMax = i + step - 1
      if (rangeMax >= max) {
        ranges.push({
          value: `${i}-plus`,
          label: `R${(i / 1000).toFixed(0)}k+`,
        })
        break
      } else {
        ranges.push({
          value: `${i}-${rangeMax}`,
          label: `R${(i / 1000).toFixed(0)}k - R${(rangeMax / 1000).toFixed(
            0
          )}k`,
        })
      }
    }

    return ranges
  }

  const clearFilters = () => {
    setSearchTerm('')
    setMakeFilter('all')
    setModelFilter('all')
    setPriceFilter('all')
    setYearFilter('all')
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <Button onClick={() => fetchTrucks()}>Try Again</Button>
        </div>
      </div>
    )
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Make Filter */}
            <Select value={makeFilter} onValueChange={setMakeFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Makes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {filterOptions.makes.map((make) => (
                  <SelectItem key={make} value={make.toLowerCase()}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Model Filter */}
            <Select
              value={modelFilter}
              onValueChange={setModelFilter}
              disabled={makeFilter === 'all'}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Models" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                {getModelsForMake().map((model) => (
                  <SelectItem key={model} value={model.toLowerCase()}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {getPriceRanges().map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Filter */}
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {filterOptions.years
                  .sort((a, b) => b - a)
                  .map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4">
            <Button
              onClick={clearFilters}
              variant="outline"
              size="sm"
              className="ml-auto"
            >
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Showing {paginationMeta.total} trucks</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading vehicles...</p>
          </div>
        )}

        {/* Truck Grid */}
        {!loading && trucks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trucks.map((truck) => (
              <Card
                key={truck.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={truck.images[0]?.url || '/placeholder-truck.jpg'}
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
                    {truck.year} {truck.make.toUpperCase()}{' '}
                    {truck.model.toUpperCase()}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-yellow-600">
                      R{truck.vatPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-600 flex flex-row items-center">
                      <Gauge size={18} className="mr-1" />
                      {truck.mileage.toLocaleString()} km
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{truck.condition}</Badge>
                    <Badge variant="secondary">{truck.fuelType}</Badge>
                    <Badge variant="secondary">{truck.transmission}</Badge>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/inventory/${truck.slug}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && trucks.length > 0 && (
          <div className="mt-12 flex justify-end">
            <Pagination
              currentPage={paginationMeta.page}
              totalPages={paginationMeta.totalPages}
              onPageChange={(page) => fetchTrucks(page, paginationMeta.limit)}
              limit={paginationMeta.limit}
              onLimitChange={(newLimit) => {
                fetchTrucks(1, newLimit)
              }}
              showLimitSelector={true}
            />
          </div>
        )}

        {/* No Results */}
        {!loading && trucks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No trucks found matching your criteria.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About TruckMax Dealers
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              For over 25 years, TruckMax has been the premier destination for
              quality pre-owned trucks. We specialize in work trucks, pickup
              trucks, and commercial vehicles that deliver reliability and value
              for our customers.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team of experts carefully selects each vehicle in our
              inventory, ensuring that every truck meets our high standards for
              quality and performance. We offer competitive financing options
              and comprehensive warranties to give you peace of mind.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Trucks in Stock</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="About us"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative text-white bg-cover bg-center bg-no-repeat md:h-[700px]"
      style={{ backgroundImage: 'url(/images/truckBg.jpg)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-600 opacity-60" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 h-full">
        <div className="relative z-10 flex items-center justify-center h-full">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Find the Right Truck for the Job
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              We are the commercial vehicle Specialists. We have over 20 years
              experience in selling quality previously owned commercial
              vehicles. We specialize in rigid trucks from 1.5 ton to 16 ton and
              source only the best stock that we can lay our hands on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
              >
                <Link href="/inventory">Browse Inventory</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

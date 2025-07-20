'use client'

import { Button } from '@/components/ui/button'

export default function ContactForm() {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-6 md:bg-white shadow-lg rounded-lg p-12">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
          Contact Form
        </h2>
        <form className="px-8">
          <div className="flex flex-col md:flex-row gap-4 space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Email"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Subject"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Your Phone Number"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={6}
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

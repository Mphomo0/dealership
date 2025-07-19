'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Star, Truck, Shield, Wrench } from 'lucide-react'
import Link from 'next/link'

export default function AddressSection() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            Ready to find your perfect truck? Get in touch with us today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 text-amber-300 mx-auto mb-2" />
              <CardTitle>Call Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold">010 590 1563</p>
              <p className="text-gray-600">Mon-Fri: 8AM-5PM</p>
              <p className="text-gray-600">Sat-Sun: Closed</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 text-amber-300 mx-auto mb-2" />
              <CardTitle>Email Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold">mi118@mweb.co.za</p>
              <p className="text-gray-600">We respond within 24 hours</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 text-amber-300 mx-auto mb-2" />
              <CardTitle>Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold">
                9 Chrislou Cresent, Alberton North
              </p>
              <p className="text-gray-600">Alberton, Gauteng, 1449</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

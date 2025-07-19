import CreateUser from '@/components/sections/dashboardSection/usersSection/CreateUser'
import React from 'react'

export default function AddUser() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New User
        </h2>

        <CreateUser />
      </div>
    </div>
  )
}

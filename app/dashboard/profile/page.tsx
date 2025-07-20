import { auth } from '@/auth'
import Link from 'next/link'

export default async function Profile() {
  const session = await auth()

  if (!session) {
    return (
      <div className="bg-gray-50 flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-xl">Not authenticated</p>
        <Link href="/login">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Login
          </button>
        </Link>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md text-center">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h1>
        <p className="text-gray-600 mb-4">
          Full-stack developer passionate about building fast, modern, and
          accessible web apps using React, Next.js, and Tailwind CSS.
        </p>
        <div className="text-sm text-gray-500">
          <p>
            Email:{' '}
            <a href="mailto:johndoe@example.com" className="text-blue-600">
              johndoe@example.com
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a
              href="https://github.com/johndoe"
              className="text-blue-600"
              target="_blank"
            >
              johndoe
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

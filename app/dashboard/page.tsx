import { auth } from '@/auth'
// import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()

  // if (!session) {
  //   return (
  //     <div className="bg-gray-50 flex flex-col items-center justify-center h-screen gap-4">
  //       <p className="text-xl">Not authenticated</p>
  //       <Link href="/login">
  //         <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
  //           Login
  //         </button>
  //       </Link>
  //     </div>
  //   )
  // }

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Add more authenticated content here */}
    </div>
  )
}

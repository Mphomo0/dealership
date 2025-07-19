import GetUsers from '@/components/sections/dashboardSection/usersSection/GetUsers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Users() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-24">
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-amber-600">Users</h1>
        </div>
        <div className="float-right">
          <Link href="/dashboard/users/add-user">
            <Button>ADD USER</Button>
          </Link>
        </div>
      </div>

      <GetUsers />
    </section>
  )
}

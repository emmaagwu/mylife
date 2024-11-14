// import { Metadata } from 'next'
// import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'
// import { authOptions } from '@/lib/authoptions'

// export const metadata: Metadata = {
//   title: 'Planning & Goals',
//   description: 'Manage your life roles, goals, and schedule',
// }

// export default async function PlanningLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const session = await getServerSession(authOptions)

//   if (!session) {
//     redirect('/login')
//   }

//   return (
//     <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//       {children}
//     </div>
//   )
// }

export default function PlanningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
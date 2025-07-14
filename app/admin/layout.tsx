import AdminSidebar from '@/components/cms/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-hidden flex">
      <AdminSidebar />
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
} 
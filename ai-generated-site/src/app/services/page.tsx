import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Services() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Services</h1>
          <p className="text-xl text-gray-600">HVAC services and specializations</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
import { LoadingSpinner } from '@/components/loading-spinner'

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600 inter-body">Loading...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

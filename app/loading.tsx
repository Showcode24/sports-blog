import { LoadingSpinner } from '@/components/loading-spinner'

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 inter-body">Loading SportsPulse...</p>
      </div>
    </div>
  )
}

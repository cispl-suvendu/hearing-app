'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="bg-skyLight min-h-screen h-fit flex flex-col items-center justify-center">
      <h2 className='font-bold font-mono text-2xl m-6'>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='btnPrimary'
      >
        Try again
      </button>
    </div>
  )
}
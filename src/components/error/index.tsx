import React from 'react'

interface ErrorMessageProps {
    errorDetail: string
}

export default function ErrorMessage({errorDetail}:ErrorMessageProps) {
  return (
    <div>
      {errorDetail}
    </div>
  )
}

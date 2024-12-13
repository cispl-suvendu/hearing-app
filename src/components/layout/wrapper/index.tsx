import React from 'react'

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}

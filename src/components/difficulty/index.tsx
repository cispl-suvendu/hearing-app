import React from 'react'

interface DifficultyLevelProps {
    level: number
}

interface Data {
    key:string,
    class:string
}

export default function DifficultyLevel({ level }: DifficultyLevelProps) {
    let data:Data;
    switch (level) {
        case 0:
            data = { key: 'pro', class: 'bg-orange-600' }
            break;
        case 1:
            data = { key: 'advanced', class: 'bg-purple-600' }
            break;
        case 2:
            data = { key: 'moderate', class: 'bg-blue-600' }
            break;
        case 3:
            data = { key: 'beginner', class: 'bg-green-600' }
            break;
        default:
            data = { key: 'Not Found', class: 'bg-black-600' }
    }
    return (
        <div className={`${data.class} text-xs text-white px-2 py-1 rounded-sm capitalize`}>
            {data.key}
        </div>
    )
}

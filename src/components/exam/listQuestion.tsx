import React from 'react'
import QCard from './qCard'


export default function ListQuestion({allQuestion}:any) {
  return (
    <div>
      {allQuestion.map((item:any) => {
        return (
            <QCard key={item._id} question={item} />
        )
      })}
    </div>
  )
}
